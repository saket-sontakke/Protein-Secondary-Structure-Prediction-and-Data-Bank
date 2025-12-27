import React, { useState } from 'react';
import Axios from 'axios';
import '../Styling/DataBank.css';
import { FaSearch } from 'react-icons/fa';
import RadarChart from './RadarChart';
import Plot from 'react-plotly.js';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const DataBank = () => {
  const [pdbId, setPdbId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Sample PDB IDs to display under the search bar
  const samplePdbIds = ['5D8V', '2VB1', '5JUG', '4Z39'];

  const handleSearch = async () => {
    try {
      setError('');
      const response = await Axios.get(`${baseUrl}/databank/${pdbId}`);
      setData(response.data);
    } catch (err) {
      setError('Error fetching data. PDB ID is invalid or does not exist in Database.');
      setData(null);
    }
  };

  // Handle user input and ensure PDB ID is uppercase
  const handleInputChange = (e) => {
    setPdbId(e.target.value.toUpperCase()); // Capitalize the input as user types
  };

  // Handle setting the PDB ID from the sample list
  const handleSampleClick = (id) => {
    setPdbId(id); // Set the clicked sample PDB ID
  };

  // Function to map each amino acid to its corresponding cluster type
  const aminoAcidClusters = (inputSeq, dssp3Seq) => {
    return inputSeq.split('').map((aa, i) => ({
      position: i,
      amino_acid: aa,
      cluster_type: dssp3Seq[i]
    }));
  };

  // Color mapping for amino acids
  const aminoAcidColors = {
    A: '#1f77b4', C: '#ff7f0e', D: '#2ca02c', E: '#d62728', F: '#9467bd',
    G: '#8c564b', H: '#e377c2', I: '#7f7f7f', K: '#bcbd22', L: '#17becf',
    M: '#1f77b4', N: '#ff7f0e', P: '#2ca02c', Q: '#d62728', R: '#9467bd',
    S: '#8c564b', T: '#e377c2', V: '#7f7f7f', W: '#bcbd22', Y: '#17becf',
  };

  // Generate plot data only if data is available
  let plotData = [];
  if (data) {
    plotData = aminoAcidClusters(data.input, data.dssp3);
  }

  return (
    <div className="databank-container">
      <h2 className="title">Data Bank</h2>

      {/* Input field for searching by PDB ID */}
      <div className="search-bar">
        <input
          type="text"
          value={pdbId}
          onChange={handleInputChange}
          placeholder="Enter PDB ID"
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch /> {/* The search icon is now inside the button */}
        </button>
      </div>

      {/* Display sample PDB IDs */}
      <div className="sample-ids-container">
        <p>Sample PDB IDs:</p>
        <div className="sample-buttons">
          {samplePdbIds.map((id) => (
            <button key={id} className="sample-id-button" onClick={() => handleSampleClick(id)}>
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Error handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display data only if available */}
      {data ? (
        <div className="details">
          <h1 className="title">Details for PDB ID: {data.pdb_id} (Chain Code: {data.chain_code})</h1>

          {/* Input Sequence, DSSP3, DSSP8 */}
          <div className="sequence-section">
            <div className="sequence-block">
              <h3 className="sequence-title">FASTA Sequence:</h3>
              <p className="sequence">{data.input}</p>
            </div>
            <div className="sequence-block">
              <h3 className="sequence-title">DSSP3:</h3>
              <p className="sequence">{data.dssp3}</p>
            </div>
            <div className="sequence-block">
              <h3 className="sequence-title">DSSP8:</h3>
              <p className="sequence">{data.dssp8}</p>
            </div>
          </div>

          <div className="data-bank-plot-container">
            {/* Scatter Plot */}
            <Plot
              data={[
                {
                  x: plotData.map(item => item.position),
                  y: plotData.map(item => item.cluster_type),
                  text: plotData.map(item => `Amino Acid: ${item.amino_acid}`),
                  mode: 'markers',
                  marker: {
                    size: 10,
                    color: plotData.map(item => aminoAcidColors[item.amino_acid]), // Use the color mapping
                    colorscale: 'Viridis' // Can be adjusted as needed
                  }
                }
              ]}
              layout={{
                title: 'C, H, E Cluster Distribution by Amino Acids',
                xaxis: { title: 'Position' },
                yaxis: { title: 'Cluster (C/H/E)' },
                width: 1000,
                height: 400
              }}
            />
          </div>

          {/* Length and Angles Table */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Length (Å)</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Length a</td>
                  <td>{data['Length a']}</td>
                </tr>
                <tr>
                  <td>Length b</td>
                  <td>{data['Length b']}</td>
                </tr>
                <tr>
                  <td>Length c</td>
                  <td>{data['Length c']}</td>
                </tr>
              </tbody>
            </table>

            <table className="table">
              <thead>
                <tr>
                  <th>Angles (°)</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Angle Alpha</td>
                  <td>{data['Angle Alpha']}</td>
                </tr>
                <tr>
                  <td>Angle Beta</td>
                  <td>{data['Angle Beta']}</td>
                </tr>
                <tr>
                  <td>Angle Gamma</td>
                  <td>{data['Angle Gamma']}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Radar Chart */}
          <RadarChart
            pdbId={data.pdb_id}
            values={[
              data['Length a'],
              data['Length b'],
              data['Length c'],
              data['Angle Alpha'],
              data['Angle Beta'],
              data['Angle Gamma']
            ]}
          />

          {/* Other Details */}
          <ul className="other-details">
            <li><strong>Space Group:</strong> {data['Space Group']}</li>
            <li><strong>Molecular Weight:</strong> {data['Molecular Weight']} kDa</li>
            <li><strong>Deposited Atom Count:</strong> {data['Deposited Atom Count']}</li>
            <li><strong>Polymer Monomer Count:</strong> {data['Polymer Monomer Count']}</li>
            <li><strong>Modeled Polymer Monomer Count:</strong> {data['Modeled Polymer Monomer Count']}</li>
            <li><strong>Unmodeled Polymer Monomer Count:</strong> {data['Unmodeled Polymer Monomer Count']}</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DataBank;
