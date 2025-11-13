    import pandas as pd
    import re
    import requests
    import time

    def fetch_dssp_directly(pdb_id, rest_url):
        """
        Fetches DSSP data for the given PDB ID using the DSSP REST API.
        
        Parameters:
        pdb_id (str): The PDB ID to fetch data for
        rest_url (str): The base URL for the DSSP REST API
        
        Returns:
        str: The DSSP data as a string
        """
        # Set up the request URL for creating DSSP data
        url_create = f"{rest_url}api/create/pdb_id/dssp/"
        
        # Submit the job to retrieve DSSP data
        data = {'data': pdb_id}
        response = requests.post(url_create, data=data)
        response.raise_for_status()
        job_id = response.json()['id']
        print(f"Job submitted for PDB ID '{pdb_id}'. Job ID: '{job_id}'")
        
        # Poll the job status until it completes
        ready = False
        while not ready:
            url_status = f"{rest_url}api/status/pdb_id/dssp/{job_id}/"
            status_response = requests.get(url_status)
            status_response.raise_for_status()
            status = status_response.json()['status']
            print(f"Job status for PDB ID '{pdb_id}' is: '{status}'")
            
            if status == 'SUCCESS':
                ready = True
            elif status in ['FAILURE', 'REVOKED']:
                raise Exception(f"Error for PDB ID '{pdb_id}': {status_response.json().get('message', 'Unknown error')}")
            else:
                time.sleep(5)
        
        # Retrieve the DSSP data once the job is successful
        url_result = f"{rest_url}api/result/pdb_id/dssp/{job_id}/"
        result_response = requests.get(url_result)
        result_response.raise_for_status()
        
        try:
            # Attempt to parse result as JSON
            result_json = result_response.json()
            if "result" in result_json:
                return result_json["result"]
            else:
                raise ValueError("Unexpected JSON structure")
        except ValueError:
            # Fall back to plain text if JSON parsing fails
            return result_response.text

    def parse_dssp_content(content):
        """
        Parses DSSP content (either from file or API) and extracts relevant information.
        
        Parameters:
        content (str): The DSSP file content as a string
        
        Returns:
        dict: Dictionary containing extracted sequences and metadata
        """
        # Initialize variables
        sequences = {
            'aa_seq': '',
            'dssp8_seq': '',
        }
        asa = None
        pdb_id = None
        
        lines = content.split('\n')
        
        # Extract PDB ID from HEADER line using regex
        for line in lines:
            if line.startswith('HEADER'):
                match = re.search(r'HEADER\s+.*\s+(\w{4})', line)
                if match:
                    pdb_id = match.group(1).strip()
                break
        
        # Extract ASA from the file
        for line in lines:
            if "ACCESSIBLE SURFACE OF PROTEIN" in line:
                try:
                    asa = float(line.split()[0])
                except ValueError:
                    asa = None
                break
        
        # Extract sequences
        start_parsing = False
        for line in lines:
            if line.startswith('  #  RESIDUE AA'):
                start_parsing = True
                continue
            
            if start_parsing and len(line.strip()) > 0:
                # Check if line matches the expected format
                if re.match(r'\s+\d+\s+\d+\s+\w\s+\w', line):
                    aa = line[13:14]  # AA column
                    dssp8 = line[16:17]  # Structure column
                    
                    # Add to sequences
                    sequences['aa_seq'] += aa
                    sequences['dssp8_seq'] += dssp8 if dssp8.strip() else 'C'
        
        # Create dssp3 sequence
        dssp3_mapping = {
            '-': 'C', 'I': 'C', 'T': 'C', 'S': 'C',
            'G': 'H', 'H': 'H',
            'B': 'E', 'E': 'E',
            ' ': 'C'
        }
        sequences['dssp3_seq'] = ''.join(dssp3_mapping.get(char, char) 
                                        for char in sequences['dssp8_seq'])
        
        return {
            'pdb_id': pdb_id,
            'aa_seq': sequences['aa_seq'],
            'dssp3_seq': sequences['dssp3_seq'],
            'dssp8_seq': sequences['dssp8_seq'],
            'asa': asa
        }

    def process_pdb_list(input_file, output_file, use_api=False, rest_url=None):
        """
        Process a list of PDB IDs either from files or using the API.
        
        Parameters:
        input_file (str): Path to the text file containing list of PDB IDs or files
        output_file (str): Path where the output CSV will be saved
        use_api (bool): Whether to fetch data using API instead of local files
        rest_url (str): Base URL for the DSSP REST API (required if use_api=True)
        """
        all_data = []
        
        with open(input_file, 'r') as file:
            for line in file:
                item = line.strip()
                try:
                    if use_api:
                        # Assume the input is a PDB ID when using API
                        dssp_content = fetch_dssp_directly(item, rest_url)
                        parsed_data = parse_dssp_content(dssp_content)
                    else:
                        # Assume the input is a file path when not using API
                        with open(item, 'r') as dssp_file:
                            dssp_content = dssp_file.read()
                            parsed_data = parse_dssp_content(dssp_content)
                    
                    # Verify PDB ID extraction
                    if not parsed_data['pdb_id']:
                        raise ValueError(f"Failed to extract PDB ID for {item}")
                    
                    # Create a DataFrame from the parsed data
                    df = pd.DataFrame({
                        'pdb_id': [parsed_data['pdb_id']],
                        'input': [parsed_data['aa_seq']],
                        'dssp3': [parsed_data['dssp3_seq']],
                        'dssp8': [parsed_data['dssp8_seq']],
                        'Accessible_Surface_Area': [parsed_data['asa']]
                    })
                    
                    all_data.append(df)
                    print(f"Successfully processed {item}")
                    
                except Exception as e:
                    print(f"Error processing {item}: {str(e)}")
        
        # Combine all dataframes
        if all_data:
            final_df = pd.concat(all_data, ignore_index=True)
            final_df.to_csv(output_file, index=False)
            print(f"Successfully created {output_file}")
        else:
            print("No data was processed successfully")

    # Example usage
    if __name__ == "__main__":
        input_file = "pdb_list.txt"  # File containing PDB IDs
        output_file = "model_dataset.csv"
        
        # For using local files:
        # process_pdb_list(input_file, output_file, use_api=False)
        
        # For using API:
        rest_url = "https://www3.cmbi.umcn.nl/xssp/"
        process_pdb_list(input_file, output_file, use_api=True, rest_url=rest_url)
