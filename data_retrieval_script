import requests
import time
import pandas as pd

def fetch_dssp_directly(pdb_id, rest_url):
    """
    Fetches DSSP data for the given PDB ID, processes the result to extract
    sequences and surface area information, handling multiple chains.
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
            raise Exception(f"Error for PDB ID '{pdb_id}': {status_response.json()['message']}")
        else:
            time.sleep(5)

    # Retrieve the DSSP data once the job is successful
    url_result = f"{rest_url}api/result/pdb_id/dssp/{job_id}/"
    result_response = requests.get(url_result)
    result_response.raise_for_status()
    
    # Extract the result content and process it
    dssp_content = result_response.json()['result'].splitlines()
    
    # Initialize variables for multiple chains
    chains_data = []
    current_chain_data = {
        'chain': None,
        'structure_data': [],
        'aa_sequence': []
    }
    asa = None
    read_data = False

    # Parse the DSSP data
    for line in dssp_content:
        # Extract ASA
        if "ACCESSIBLE SURFACE OF PROTEIN" in line:
            try:
                asa = float(line.split()[0])
            except:
                asa = None
            
        if read_data:
            if "!*" in line:  # Chain break marker
                if current_chain_data['chain'] is not None:
                    chains_data.append(current_chain_data)
                current_chain_data = {
                    'chain': None,
                    'structure_data': [],
                    'aa_sequence': []
                }
                continue
                
            if len(line.strip()) > 16:  # Check if line has enough characters
                chain = line[11:12].strip()  # Extract chain identifier
                structure = line[16:17].strip()  # Extract STRUCTURE column
                aa = line[13:14].strip()  # Extract AA column
                
                # If this is a new chain, store the previous chain data
                if current_chain_data['chain'] is not None and chain != current_chain_data['chain']:
                    chains_data.append(current_chain_data)
                    current_chain_data = {
                        'chain': chain,
                        'structure_data': [],
                        'aa_sequence': []
                    }
                
                # Initialize chain if not yet set
                if current_chain_data['chain'] is None:
                    current_chain_data['chain'] = chain
                
                current_chain_data['structure_data'].append(structure if structure else 'C')
                current_chain_data['aa_sequence'].append(aa if aa else 'X')

        # Start reading after header line
        if "#  RESIDUE" in line:
            read_data = True

    # Add the last chain
    if current_chain_data['chain'] is not None:
        chains_data.append(current_chain_data)

    # Process each chain's data
    result_data = []
    for chain_data in chains_data:
        if len(chain_data['structure_data']) > 0:  # Only process chains with data
            # Create sequences
            aa_sequence_str = ''.join(chain_data['aa_sequence'])
            dssp8_sequence_str = ''.join(chain_data['structure_data'])
            
            # Create DSSP3 sequence
            dssp3_mapping = {
                '-': 'C', 'I': 'C', 'T': 'C', 'S': 'C',
                'G': 'H', 'H': 'H',
                'B': 'E', 'E': 'E',
                ' ': 'C'
            }
            
            dssp3_sequence = [dssp3_mapping.get(char, char) for char in chain_data['structure_data']]
            dssp3_sequence_str = ''.join(dssp3_sequence)
            
            result_data.append({
                'chain': chain_data['chain'],
                'aa_seq': aa_sequence_str,
                'dssp8': dssp8_sequence_str,
                'dssp3': dssp3_sequence_str,
                'asa': asa
            })
    
    return result_data

def process_dssp_for_csv(input_csv, output_csv, rest_url):
    """
    Reads a CSV file with pdb_id column, retrieves DSSP data for each PDB ID,
    and saves the results in a new CSV file with additional columns.
    Handles multiple chains per PDB ID.
    """
    # Read input CSV
    df = pd.read_csv(input_csv)
    
    # Initialize list to store all rows
    all_rows = []
    
    for pdb_id in df['pdb_id']:
        try:
            chains_data = fetch_dssp_directly(pdb_id, rest_url)
            for chain_data in chains_data:
                all_rows.append({
                    'pdb_id': pdb_id,
                    'chain_code': chain_data['chain'],
                    'input': chain_data['aa_seq'],
                    'dssp3': chain_data['dssp3'],
                    'dssp8': chain_data['dssp8'],
                    'Accessible_Surface_Area': chain_data['asa']
                })
        except Exception as e:
            print(f"Failed to retrieve DSSP for PDB ID '{pdb_id}': {e}")
            all_rows.append({
                'pdb_id': pdb_id,
                'chain_code': None,
                'input': None,
                'dssp3': None,
                'dssp8': None,
                'Accessible_Surface_Area': None
            })
    
    # Create DataFrame from all rows
    result_df = pd.DataFrame(all_rows)
    
    # Save the DataFrame to a new CSV file
    result_df.to_csv(output_csv, index=False)
    print(f"Results saved to '{output_csv}'")

if __name__ == "__main__":
    # Define the input and output CSV paths and the REST URL
    input_csv = "pdb_input.csv"  # Replace with the path to your input CSV file
    output_csv = "data_bank.csv"  # The path for the output CSV file
    rest_url = "https://www3.cmbi.umcn.nl/xssp/"

    # Process DSSP data for each PDB ID in the input CSV and save to a new file
    process_dssp_for_csv(input_csv, output_csv, rest_url)
