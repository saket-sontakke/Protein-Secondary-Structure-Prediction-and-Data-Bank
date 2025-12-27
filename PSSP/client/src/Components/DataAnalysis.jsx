import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'; // Import FA icons
import '../Styling/DataAnalysis.css';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const DataAnalysis = () => {
  const navigate = useNavigate();
  const [lengthData, setLengthData] = useState({
    lengthsA: [],
    lengthsB: [],
    lengthsC: [],
    molecularWeights: [], // Add molecular weights state
    atomCounts: [], // Add atom counts state
    spaceGroups: [], // Add space groups state
    anglesAlpha: [],
    anglesBeta: [],
    anglesGamma: []
  });

  const [dataHead, setDataHead] = useState([]); // State for dataset head
  const [expandedCells, setExpandedCells] = useState({}); // State for expanded cells
  const [entryCount, setEntryCount] = useState(0); // State for entry count

  useEffect(() => {
    // Fetch data for visualization
    Axios.get(`${baseUrl}/visualize`)  // Adjusted to correct port
      .then((response) => {
        const lengthsA = response.data.map(item => item['Length a']);
        const lengthsB = response.data.map(item => item['Length b']);
        const lengthsC = response.data.map(item => item['Length c']);
        const molecularWeights = response.data.map(item => item['Molecular Weight']); // Extract molecular weight
        const atomCounts = response.data.map(item => item['Deposited Atom Count']); // Extract atom count
        const spaceGroups = response.data.map(item => item['Space Group']); // Extract space group
        const anglesAlpha = response.data.map(item => item['Angle Alpha']);
        const anglesBeta = response.data.map(item => item['Angle Beta']);
        const anglesGamma = response.data.map(item => item['Angle Gamma']);

        setLengthData({
          lengthsA,
          lengthsB,
          lengthsC,
          molecularWeights, // Store molecular weight in state
          atomCounts, // Store atom count in state
          spaceGroups, // Store space group in state
          anglesAlpha,
          anglesBeta,
          anglesGamma,
          
        });
        // Setting entry count in useEffect after data fetch
        setEntryCount(response.data.length);
      })
      .catch((error) => console.error('Error fetching data:', error));

    // Fetch the head of the dataset
    Axios.get(`${baseUrl}/databank-head`)
      .then((response) => {
        setDataHead(response.data); // Store the first few rows in state
      })
      .catch((error) => console.error('Error fetching dataset head:', error));
  }, []);

  // Function to toggle showing more/less for a specific column
  const toggleCellExpansion = (cellType) => {
    setExpandedCells(prevState => ({
      ...prevState,
      [cellType]: !prevState[cellType] // Toggle expanded state for the entire column
    }));
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Error copying text:', err));
  };
  
  return (
    <div className='analysis'>
      <h1>Data Analysis</h1>

      <h2>Protein Database</h2>
      <p>
        A protein database is a valuable resource for researchers and scientists, providing a collection of structural and sequence-related data on proteins. By aggregating this data in a standardized and accessible format, protein databases enable users to conduct computational analyses, generate new hypotheses, and advance our understanding of biological processes at the molecular level.
      </p>
       {/* Display the number of entries */}
       <p className="entry-count">Number of entries in the dataset: {entryCount}</p>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>PDB ID</th>
              <th>Chain Code</th>
              <th>Input <br></br>(FASTA Sequence)</th>
              <th>DSSP3 <br></br>(3-state)</th>
              <th>DSSP8 <br></br>(8-state)</th>
              <th>Length a (Å)</th>
              <th>Length b (Å)</th>
              <th>Length c (Å)</th>
              <th>Angle Alpha (°)</th>
              <th>Angle Beta (°)</th>
              <th>Angle Gamma (°)</th>
              <th>Space Group</th>
              <th>Molecular Weight (kDa)</th>
              <th>Deposited Atom Count</th>
              <th>Polymer Monomer Count</th>
              <th>Modeled Polymer Monomer Count</th>
              <th>Unmodeled Polymer Monomer Count</th>
            </tr>
          </thead>
          <tbody>
            {dataHead.map((row, index) => (
              <tr key={index}>
                <td>{row.pdb_id}</td>
                <td>{row.chain_code}</td>

                {/* Toggle showing full or shortened sequence */}
                <td>
                  <span 
                    onClick={() => toggleCellExpansion('input')} 
                    style={{ cursor: 'pointer' }}
                  >
                    {expandedCells['input'] ? row.input : `${row.input.substring(0, 10)}...`}
                  </span>
                  <FontAwesomeIcon 
                    icon={faCopy} 
                    onClick={() => copyToClipboard(row.input)} 
                    className="copy-icon" 
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </td>

                {/* DSSP3 column */}
                <td>
                  <span 
                    onClick={() => toggleCellExpansion('dssp3')} 
                    style={{ cursor: 'pointer' }}
                  >
                    {expandedCells['dssp3'] ? row.dssp3 : `${row.dssp3.substring(0, 10)}...`}
                  </span>
                  <FontAwesomeIcon 
                    icon={faCopy} 
                    onClick={() => copyToClipboard(row.dssp3)} 
                    className="copy-icon" 
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </td>

                {/* DSSP8 column */}
                <td>
                  <span 
                    onClick={() => toggleCellExpansion('dssp8')} 
                    style={{ cursor: 'pointer' }}
                  >
                    {expandedCells['dssp8'] ? row.dssp8 : `${row.dssp8.substring(0, 10)}...`}
                  </span>
                  <FontAwesomeIcon 
                    icon={faCopy} 
                    onClick={() => copyToClipboard(row.dssp8)} 
                    className="copy-icon" 
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </td>

                {/* Other columns */}
                <td>{row['Length a']}</td>
                <td>{row['Length b']}</td>
                <td>{row['Length c']}</td>
                <td>{row['Angle Alpha']}</td>
                <td>{row['Angle Beta']}</td>
                <td>{row['Angle Gamma']}</td>
                <td>{row['Space Group']}</td>
                <td>{row['Molecular Weight']}</td>
                <td>{row['Deposited Atom Count']}</td>
                <td>{row['Polymer Monomer Count']}</td>
                <td>{row['Modeled Polymer Monomer Count']}</td>
                <td>{row['Unmodeled Polymer Monomer Count']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p style={{ marginBottom: '1rem' }}>
      For detailed dataset description 
      <span
        onClick={() => navigate('/Resources')} 
        style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px'}} 
      >
        click here.
      </span>
    </p>

    
      {/* Button to view full dataset */}
      <button className='view-dataset-button'
        onClick={() => navigate('/fulldataset')}
        style={{ padding: '10px 20px', cursor: 'pointer', color: 'white', marginBottom: '20px' }}
      >
        View Full Dataset
      </button>


    <div className='plots'>
      {/* Plotly visualization for Length a, b, c */}
      <Plot
      style={{ marginBottom: '2rem' }}
        data={[
          {
            x: lengthData.lengthsA,
            type: 'histogram',
            name: 'Length a',
            xbins: {
              size: 10
            },
            marker: {
              color: '#4a90e2',
              line: {
                color: '#1c3d5a',
                width: 0.8
              }
            },
            opacity: 0.7,
            nbinsx: 80,
            hoverinfo: 'x+y',
          },
          {
            x: lengthData.lengthsB,
            type: 'histogram',
            name: 'Length b',
            marker: {
              color: '#50e3c2',
              line: {
                color: '#3a7766',
                width: 0.8
              }
            },
            opacity: 0.7,
            nbinsx: 80,
            hoverinfo: 'x+y',
          },
          {
            x: lengthData.lengthsC,
            type: 'histogram',
            name: 'Length c',
            marker: {
              color: '#f5a623',
              line: {
                color: '#d47b14',
                width: 0.8
              }
            },
            opacity: 0.7,
            nbinsx: 80,
            hoverinfo: 'x+y',
          },
        ]}
        layout={{
          width: 650,
          height: 400,
          title: {
            text: 'Distribution of Lengths (a, b, c)',
            font: {
              family: 'Arial, sans-serif',
              size: 18,
              color: '#333333'
            }
          },
          xaxis: { 
            title: 'Length', 
            range: [0, 450],
            titlefont: {
              family: 'Arial, sans-serif',
              size: 14,
              color: '#333333'
            }
          },
          yaxis: { 
            title: 'Frequency',
            range: [0, 3500],
            titlefont: {
              family: 'Arial, sans-serif',
              size: 14,
              color: '#333333'
            }
          },
          paper_bgcolor: '#f9f9f9',
          plot_bgcolor: '#ffffff',
          barmode: 'stack',
          showlegend: true,
          legend: {
            x: 1,
            y: 1,
            bgcolor: '#f9f9f9',
            bordercolor: '#cccccc',
            borderwidth: 1
          },
          margin: { l: 60, r: 60, b: 60, t: 60, pad: 5 }
        }}
      />

      
     {/* Plotly visualization for Molecular Weight */}
     <Plot
     style={{ marginBottom: '2rem' }}
        data={[
          {
            x: lengthData.molecularWeights,
            type: 'histogram',
            name: 'Molecular Weight',
            marker: {
              color: 'skyblue',
              line: {
                color: 'dark blue',
                width: 0.6
              }
            },
            opacity: 0.8,
            nbinsx: 80,
            hoverinfo: 'x+y',
          }
        ]}
        layout={{
          width: 650,
          height: 400,
          title: {
            text: 'Distribution of Molecular Weight',
            font: {
              family: 'Arial, sans-serif',
              size: 18,
              color: '#333333'
            }
          },
          xaxis: {
            title: 'Molecular Weight',
            titlefont: {
              family: 'Arial, sans-serif',
              size: 14,
              color: '#333333'
            }
          },
          yaxis: {
            title: 'Frequency',
            titlefont: {
              family: 'Arial, sans-serif',
              size: 14,
              color: '#333333'
            }
          },
          paper_bgcolor: '#f9f9f9',
          plot_bgcolor: '#ffffff',
          margin: { l: 60, r: 60, b: 60, t: 60, pad: 5 },
          showlegend: false
        }}
      />

      {/* Plotly scatter plot for Atom Count vs Molecular Weight */}
      <Plot
      style={{ marginBottom: '2rem' }}
      data={[
        {
          x: lengthData.molecularWeights,
          y: lengthData.atomCounts,
          mode: 'markers',
          marker: {
            size: 10,
            color: lengthData.spaceGroups.map((group, index) => index), // Assign numeric values for coloring
            colorscale: 'Viridis',
            colorbar: { title: 'Space Group' },
          },
          hovertemplate: 'Molecular Weight: %{x}<br>Atom Count: %{y}<br>Space Group: %{customdata}<extra></extra>',
          customdata: lengthData.spaceGroups, 
        }
      ]}
      layout={{
        width: 650,
        height: 400,
        title: 'Atom Count vs Molecular Weight',
        xaxis: {
          title: 'Molecular Weight',
          titlefont: {
            family: 'Arial, sans-serif',
            size: 14,
            color: '#333333'
          }
        },
        yaxis: {
          title: 'Deposited Atom Count',
          titlefont: {
            family: 'Arial, sans-serif',
            size: 14,
            color: '#333333'
          }
        },
        paper_bgcolor: '#f9f9f9',
        plot_bgcolor: '#ffffff',
        margin: { l: 60, r: 60, b: 60, t: 60, pad: 5 }
      }}
    />


      {/* 3D Scatter Plot visualization */}
      <Plot
      style={{ marginBottom: '2rem' }}
        data={[
          {
            x: lengthData.lengthsA,
            y: lengthData.lengthsB,
            z: lengthData.lengthsC,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
              size: 5,
              color: lengthData.molecularWeights,
              colorscale: 'Viridis',
              colorbar: {
                title: 'Molecular Weight',
                tickvals: [Math.min(...lengthData.molecularWeights), Math.max(...lengthData.molecularWeights)],
                ticktext: ['Min', 'Max'],
              },
            },
          },
        ]}
        layout={{
          width: 650,
          height: 500,
          title: '3D Scatter Plot of Length (a, b, c) with Molecular Weight Color',
          scene: {
            xaxis: { title: 'Length a' },
            yaxis: { title: 'Length b' },
            zaxis: { title: 'Length c' },
          },
          margin: { l: 0, r: 0, b: 0, t: 40 },
        }}
      />


       {/* 3D Scatter Plot for Angles */}
       <Plot
       style={{ marginBottom: '2rem' }}
        data={[
          {
            x: lengthData.anglesAlpha,
            y: lengthData.anglesBeta,
            z: lengthData.anglesGamma,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
              size: 5,
              color: lengthData.molecularWeights,
              colorscale: 'Viridis',
              opacity: 0.8,
              colorbar: { title: 'Molecular Weight' }
            }
          }
        ]}
        layout={{
          width: 650,
          height: 450,
          title: '3D Scatter Plot of Angles (Alpha, Beta, Gamma)',
          scene: {
            xaxis: { title: 'Angle Alpha' },
            yaxis: { title: 'Angle Beta' },
            zaxis: { title: 'Angle Gamma' }
          },
          margin: { l: 60, r: 60, b: 60, t: 60 }
        }}
      />
    </div>

    </div>
  );
};

export default DataAnalysis;


