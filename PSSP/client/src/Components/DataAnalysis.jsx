// import React, { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCopy } from '@fortawesome/free-solid-svg-icons'; 
// import { FaSpinner } from 'react-icons/fa'; // Import spinner
// import '../Styling/DataAnalysis.css';

// const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// const DataAnalysis = () => {
//   const navigate = useNavigate();
  
//   // Loading state initialized to true
//   const [loading, setLoading] = useState(true);

//   const [lengthData, setLengthData] = useState({
//     lengthsA: [],
//     lengthsB: [],
//     lengthsC: [],
//     molecularWeights: [], 
//     atomCounts: [], 
//     spaceGroups: [], 
//     anglesAlpha: [],
//     anglesBeta: [], 
//     anglesGamma: []
//   });

//   const [dataHead, setDataHead] = useState([]); 
//   const [expandedCells, setExpandedCells] = useState({}); 
//   const [entryCount, setEntryCount] = useState(0); 

//   useEffect(() => {
//     // Start loading
//     setLoading(true);

//     // Use Promise.all to fetch both datasets simultaneously
//     const fetchData = async () => {
//       try {
//         const [visualizeRes, headRes] = await Promise.all([
//           Axios.get(`${baseUrl}/visualize`),
//           Axios.get(`${baseUrl}/databank-head`)
//         ]);

//         // Process Visualization Data
//         const lengthsA = visualizeRes.data.map(item => item['Length a']);
//         const lengthsB = visualizeRes.data.map(item => item['Length b']);
//         const lengthsC = visualizeRes.data.map(item => item['Length c']);
//         const molecularWeights = visualizeRes.data.map(item => item['Molecular Weight']); 
//         const atomCounts = visualizeRes.data.map(item => item['Deposited Atom Count']); 
//         const spaceGroups = visualizeRes.data.map(item => item['Space Group']); 
//         const anglesAlpha = visualizeRes.data.map(item => item['Angle Alpha']);
//         const anglesBeta = visualizeRes.data.map(item => item['Angle Beta']);
//         const anglesGamma = visualizeRes.data.map(item => item['Angle Gamma']);

//         setLengthData({
//           lengthsA, lengthsB, lengthsC,
//           molecularWeights, atomCounts, spaceGroups,
//           anglesAlpha, anglesBeta, anglesGamma,
//         });
//         setEntryCount(visualizeRes.data.length);

//         // Process Table Head Data
//         setDataHead(headRes.data);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         // Stop loading whether successful or failed
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleCellExpansion = (cellType) => {
//     setExpandedCells(prevState => ({
//       ...prevState,
//       [cellType]: !prevState[cellType] 
//     }));
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => alert('Copied to clipboard!'))
//       .catch((err) => console.error('Error copying text:', err));
//   };
  
//   // Standard config for responsive plots
//   const plotConfig = { responsive: true, displayModeBar: false };
//   const plotStyle = { width: '100%', height: '100%', marginBottom: '2rem' };

//   if (loading) {
//     return (
//       <div className='analysis'>
//         <h1>Data Analysis</h1>
//         <div className="loading-container">
//            <FaSpinner className="icon-spin" />
//            <p>Loading dataset...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='analysis'>
//       <h1>Data Analysis</h1>

//       <h2>Protein Database</h2>
//       <p>
//         A protein database is a valuable resource for researchers and scientists, providing a collection of structural and sequence-related data on proteins. By aggregating this data in a standardized and accessible format, protein databases enable users to conduct computational analyses, generate new hypotheses, and advance our understanding of biological processes at the molecular level.
//       </p>
//        <p className="entry-count">Number of entries in the dataset: {entryCount}</p>

//       <div className="table-container">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>PDB ID</th>
//               <th>Chain Code</th>
//               <th>Input <br></br>(FASTA Sequence)</th>
//               <th>DSSP3 <br></br>(3-state)</th>
//               <th>DSSP8 <br></br>(8-state)</th>
//               <th>Length a (Å)</th>
//               <th>Length b (Å)</th>
//               <th>Length c (Å)</th>
//               <th>Angle Alpha (°)</th>
//               <th>Angle Beta (°)</th>
//               <th>Angle Gamma (°)</th>
//               <th>Space Group</th>
//               <th>Molecular Weight (kDa)</th>
//               <th>Deposited Atom Count</th>
//               <th>Polymer Monomer Count</th>
//               <th>Modeled Polymer Monomer Count</th>
//               <th>Unmodeled Polymer Monomer Count</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataHead.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.pdb_id}</td>
//                 <td>{row.chain_code}</td>
//                 <td>
//                   <span onClick={() => toggleCellExpansion('input')} style={{ cursor: 'pointer' }}>
//                     {expandedCells['input'] ? row.input : `${row.input.substring(0, 10)}...`}
//                   </span>
//                   <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.input)} className="copy-icon" style={{ cursor: 'pointer', marginLeft: '8px' }} />
//                 </td>
//                 <td>
//                   <span onClick={() => toggleCellExpansion('dssp3')} style={{ cursor: 'pointer' }}>
//                     {expandedCells['dssp3'] ? row.dssp3 : `${row.dssp3.substring(0, 10)}...`}
//                   </span>
//                   <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp3)} className="copy-icon" style={{ cursor: 'pointer', marginLeft: '8px' }} />
//                 </td>
//                 <td>
//                   <span onClick={() => toggleCellExpansion('dssp8')} style={{ cursor: 'pointer' }}>
//                     {expandedCells['dssp8'] ? row.dssp8 : `${row.dssp8.substring(0, 10)}...`}
//                   </span>
//                   <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp8)} className="copy-icon" style={{ cursor: 'pointer', marginLeft: '8px' }} />
//                 </td>
//                 <td>{row['Length a']}</td>
//                 <td>{row['Length b']}</td>
//                 <td>{row['Length c']}</td>
//                 <td>{row['Angle Alpha']}</td>
//                 <td>{row['Angle Beta']}</td>
//                 <td>{row['Angle Gamma']}</td>
//                 <td>{row['Space Group']}</td>
//                 <td>{row['Molecular Weight']}</td>
//                 <td>{row['Deposited Atom Count']}</td>
//                 <td>{row['Polymer Monomer Count']}</td>
//                 <td>{row['Modeled Polymer Monomer Count']}</td>
//                 <td>{row['Unmodeled Polymer Monomer Count']}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <p style={{ marginBottom: '1rem' }}>
//       For detailed dataset description 
//       <span onClick={() => navigate('/Resources')} style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px'}}>
//         click here.
//       </span>
//     </p>

    
//       <button className='view-dataset-button'
//         onClick={() => navigate('/fulldataset')}
//         style={{ padding: '10px 20px', cursor: 'pointer', color: 'white', marginBottom: '20px' }}
//       >
//         View Full Dataset
//       </button>


//     <div className='plots'>
//       {/* Lengths Histogram */}
//       <Plot
//         useResizeHandler={true}
//         style={plotStyle}
//         config={plotConfig}
//         data={[
//           {
//             x: lengthData.lengthsA, type: 'histogram', name: 'Length a',
//             xbins: { size: 10 },
//             marker: { color: '#4a90e2', line: { color: '#1c3d5a', width: 0.8 } },
//             opacity: 0.7, nbinsx: 80, hoverinfo: 'x+y',
//           },
//           {
//             x: lengthData.lengthsB, type: 'histogram', name: 'Length b',
//             marker: { color: '#50e3c2', line: { color: '#3a7766', width: 0.8 } },
//             opacity: 0.7, nbinsx: 80, hoverinfo: 'x+y',
//           },
//           {
//             x: lengthData.lengthsC, type: 'histogram', name: 'Length c',
//             marker: { color: '#f5a623', line: { color: '#d47b14', width: 0.8 } },
//             opacity: 0.7, nbinsx: 80, hoverinfo: 'x+y',
//           },
//         ]}
//         layout={{
//           autosize: true,
//           height: 400,
//           title: 'Distribution of Lengths (a, b, c)',
//           xaxis: { title: 'Length', range: [0, 450] },
//           yaxis: { title: 'Frequency' },
//           paper_bgcolor: '#f9f9f9',
//           plot_bgcolor: '#ffffff',
//           barmode: 'stack',
//           showlegend: true,
//           legend: { orientation: 'h', y: -0.2 },
//           margin: { l: 50, r: 20, b: 50, t: 50 }
//         }}
//       />

      
//      {/* Molecular Weight Histogram */}
//      <Plot
//         useResizeHandler={true}
//         style={plotStyle}
//         config={plotConfig}
//         data={[
//           {
//             x: lengthData.molecularWeights, type: 'histogram', name: 'Molecular Weight',
//             marker: { color: 'skyblue', line: { color: 'dark blue', width: 0.6 } },
//             opacity: 0.8, nbinsx: 80, hoverinfo: 'x+y',
//           }
//         ]}
//         layout={{
//           autosize: true,
//           height: 400,
//           title: 'Distribution of Molecular Weight',
//           xaxis: { title: 'Molecular Weight' },
//           yaxis: { title: 'Frequency' },
//           paper_bgcolor: '#f9f9f9',
//           plot_bgcolor: '#ffffff',
//           margin: { l: 50, r: 20, b: 50, t: 50 },
//           showlegend: false
//         }}
//       />

//       {/* Atom Count Scatter */}
//       <Plot
//       useResizeHandler={true}
//       style={plotStyle}
//       config={plotConfig}
//       data={[
//         {
//           x: lengthData.molecularWeights,
//           y: lengthData.atomCounts,
//           mode: 'markers',
//           marker: {
//             size: 8,
//             color: lengthData.spaceGroups.map((group, index) => index),
//             colorscale: 'Viridis',
//           },
//           hovertemplate: 'Mol Weight: %{x}<br>Atom Count: %{y}<extra></extra>',
//         }
//       ]}
//       layout={{
//         autosize: true,
//         height: 400,
//         title: 'Atom Count vs Molecular Weight',
//         xaxis: { title: 'Molecular Weight' },
//         yaxis: { title: 'Deposited Atom Count' },
//         paper_bgcolor: '#f9f9f9',
//         plot_bgcolor: '#ffffff',
//         margin: { l: 50, r: 20, b: 50, t: 50 }
//       }}
//     />


//       {/* 3D Scatter Plot */}
//       <Plot
//         useResizeHandler={true}
//         style={plotStyle}
//         config={plotConfig}
//         data={[
//           {
//             x: lengthData.lengthsA, y: lengthData.lengthsB, z: lengthData.lengthsC,
//             type: 'scatter3d', mode: 'markers',
//             marker: {
//               size: 5,
//               color: lengthData.molecularWeights,
//               colorscale: 'Viridis',
//               colorbar: { title: 'Mol Wt', len: 0.5 },
//             },
//           },
//         ]}
//         layout={{
//           autosize: true,
//           height: 500,
//           title: '3D Plot: Lengths (a, b, c)',
//           scene: {
//             xaxis: { title: 'Len A' },
//             yaxis: { title: 'Len B' },
//             zaxis: { title: 'Len C' },
//           },
//           margin: { l: 0, r: 0, b: 0, t: 40 },
//         }}
//       />


//        {/* 3D Scatter Plot for Angles */}
//        <Plot
//         useResizeHandler={true}
//         style={plotStyle}
//         config={plotConfig}
//         data={[
//           {
//             x: lengthData.anglesAlpha, y: lengthData.anglesBeta, z: lengthData.anglesGamma,
//             type: 'scatter3d', mode: 'markers',
//             marker: {
//               size: 5,
//               color: lengthData.molecularWeights,
//               colorscale: 'Viridis',
//               opacity: 0.8,
//               colorbar: { title: 'Mol Wt', len: 0.5 }
//             }
//           }
//         ]}
//         layout={{
//           autosize: true,
//           height: 500,
//           title: '3D Plot: Angles',
//           scene: {
//             xaxis: { title: 'Alpha' },
//             yaxis: { title: 'Beta' },
//             zaxis: { title: 'Gamma' }
//           },
//           margin: { l: 0, r: 0, b: 0, t: 40 }
//         }}
//       />
//     </div>

//     </div>
//   );
// };


// export default DataAnalysis;


















import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext'; // Import the Context
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FaSpinner } from 'react-icons/fa';
import '../Styling/DataAnalysis.css';

const DataAnalysis = () => {
  const navigate = useNavigate();

  // 1. CONSUME CONTEXT
  const { lengthData, dataHead, entryCount, loading, loadingProgress } = useContext(DataContext);

  // 2. LOCAL STATE FOR "RENDER FREEZE" FIX
  const [isRendering, setIsRendering] = useState(true);
  const [expandedCells, setExpandedCells] = useState({});

  // 3. DEFERRED RENDERING EFFECT
  useEffect(() => {
    if (!loading && lengthData) {
      const timer = setTimeout(() => {
        setIsRendering(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, lengthData]);

  const toggleCellExpansion = (cellType) => {
    setExpandedCells(prevState => ({
      ...prevState,
      [cellType]: !prevState[cellType]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Error copying text:', err));
  };

  const plotConfig = { responsive: true, displayModeBar: false };
  
  // FIX 1: Removed height: '100%' so the layout height controls the vertical size
  const plotStyle = { width: '100%', marginBottom: '2rem' };

  // 4. LOADING CHECK
  if (loading || isRendering) {
    return (
      <div className='analysis'>
        <h1>Data Analysis</h1>
        <div className="loading-container">
           <FaSpinner className="icon-spin" />
           <p>{loading ? `Loading dataset... (${loadingProgress} rows)` : "Rendering Charts..."}</p>
        </div>
      </div>
    );
  }

  // Safety check
  if (!lengthData) return <div className='analysis'>Error loading data.</div>;

  return (
    <div className='analysis'>
      <h1>Data Analysis</h1>
      <h2>Protein Database</h2>
      <p>
        A protein database is a valuable resource for researchers and scientists, providing a collection of structural and sequence-related data on proteins. By aggregating this data in a standardized and accessible format, protein databases enable users to conduct computational analyses, generate new hypotheses, and advance our understanding of biological processes at the molecular level.
      </p>
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
                <td>
                  <span onClick={() => toggleCellExpansion('input')} style={{ cursor: 'pointer' }}>
                    {expandedCells['input'] ? row.input : `${row.input.substring(0, 10)}...`}
                  </span>
                  <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.input)} className="copy-icon" style={{ cursor: 'pointer', marginLeft: '8px' }} />
                </td>
                <td>
                  <span onClick={() => toggleCellExpansion('dssp3')} style={{ cursor: 'pointer' }}>
                    {expandedCells['dssp3'] ? row.dssp3 : `${row.dssp3.substring(0, 10)}...`}
                  </span>
                  <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp3)} className="copy-icon" style={{ cursor: 'pointer', marginLeft: '8px' }} />
                </td>
                <td>
                  <span onClick={() => toggleCellExpansion('dssp8')} style={{ cursor: 'pointer' }}>
                    {expandedCells['dssp8'] ? row.dssp8 : `${row.dssp8.substring(0, 10)}...`}
                  </span>
                  <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp8)} className="copy-icon" style={{ cursor: 'pointer', marginLeft: '8px' }} />
                </td>
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
      <span onClick={() => navigate('/Resources')} style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px'}}>
        click here.
      </span>
    </p>

    
      <button className='view-dataset-button'
        onClick={() => navigate('/fulldataset')}
        style={{ padding: '10px 20px', cursor: 'pointer', color: 'white', marginBottom: '20px' }}
      >
        View Full Dataset
      </button>


    <div className='plots'>
      {/* Lengths Histogram */}
      <Plot
        useResizeHandler={true}
        style={plotStyle}
        config={plotConfig}
        data={[
          {
            x: lengthData.lengthsA, type: 'histogram', name: 'Length a',
            xbins: { size: 10 },
            marker: { color: '#4a90e2', line: { color: '#1c3d5a', width: 0.8 } },
            opacity: 0.7, nbinsx: 80, hoverinfo: 'x+y',
          },
          {
            x: lengthData.lengthsB, type: 'histogram', name: 'Length b',
            marker: { color: '#50e3c2', line: { color: '#3a7766', width: 0.8 } },
            opacity: 0.7, nbinsx: 80, hoverinfo: 'x+y',
          },
          {
            x: lengthData.lengthsC, type: 'histogram', name: 'Length c',
            marker: { color: '#f5a623', line: { color: '#d47b14', width: 0.8 } },
            opacity: 0.7, nbinsx: 80, hoverinfo: 'x+y',
          },
        ]}
        layout={{
          autosize: true,
          height: 450, // Increased height slightly
          title: { 
            text: 'Distribution of Lengths (a, b, c)',
            y: 0.95, x: 0.5, xanchor: 'center', yanchor: 'top' 
          },
          xaxis: { title: 'Length', range: [0, 450] },
          yaxis: { title: 'Frequency' },
          paper_bgcolor: '#f9f9f9',
          plot_bgcolor: '#ffffff',
          barmode: 'stack',
          showlegend: true,
          legend: { orientation: 'h', y: -0.2 },
          // FIX 2: Increased top margin to 80
          margin: { l: 50, r: 20, b: 50, t: 80 }
        }}
      />

      
     {/* Molecular Weight Histogram */}
     <Plot
        useResizeHandler={true}
        style={plotStyle}
        config={plotConfig}
        data={[
          {
            x: lengthData.molecularWeights, type: 'histogram', name: 'Molecular Weight',
            marker: { color: 'skyblue', line: { color: 'dark blue', width: 0.6 } },
            opacity: 0.8, nbinsx: 80, hoverinfo: 'x+y',
          }
        ]}
        layout={{
          autosize: true,
          height: 450,
          title: { 
            text: 'Distribution of Molecular Weight',
            y: 0.95, x: 0.5, xanchor: 'center', yanchor: 'top'
          },
          xaxis: { title: 'Molecular Weight' },
          yaxis: { title: 'Frequency' },
          paper_bgcolor: '#f9f9f9',
          plot_bgcolor: '#ffffff',
          margin: { l: 50, r: 20, b: 50, t: 80 }, // Fix margin
          showlegend: false
        }}
      />

      {/* Atom Count Scatter */}
      <Plot
      useResizeHandler={true}
      style={plotStyle}
      config={plotConfig}
      data={[
        {
          x: lengthData.molecularWeights,
          y: lengthData.atomCounts,
          mode: 'markers',
          marker: {
            size: 8,
            color: lengthData.spaceGroups.map((group, index) => index),
            colorscale: 'Viridis',
          },
          hovertemplate: 'Mol Weight: %{x}<br>Atom Count: %{y}<extra></extra>',
        }
      ]}
      layout={{
        autosize: true,
        height: 450,
        title: { 
          text: 'Atom Count vs Molecular Weight',
          y: 0.95, x: 0.5, xanchor: 'center', yanchor: 'top'
        },
        xaxis: { title: 'Molecular Weight' },
        yaxis: { title: 'Deposited Atom Count' },
        paper_bgcolor: '#f9f9f9',
        plot_bgcolor: '#ffffff',
        margin: { l: 50, r: 20, b: 50, t: 80 } // Fix margin
      }}
    />


      {/* 3D Scatter Plot */}
      <Plot
        useResizeHandler={true}
        style={plotStyle}
        config={plotConfig}
        data={[
          {
            x: lengthData.lengthsA, y: lengthData.lengthsB, z: lengthData.lengthsC,
            type: 'scatter3d', mode: 'markers',
            marker: {
              size: 5,
              color: lengthData.molecularWeights,
              colorscale: 'Viridis',
              colorbar: { title: 'Mol Wt', len: 0.5 },
            },
          },
        ]}
        layout={{
          autosize: true,
          height: 550, // Taller for 3D
          title: { 
            text: '3D Plot: Lengths (a, b, c)',
            y: 0.95, x: 0.5, xanchor: 'center', yanchor: 'top'
          },
          scene: {
            xaxis: { title: 'Len A' },
            yaxis: { title: 'Len B' },
            zaxis: { title: 'Len C' },
          },
          margin: { l: 0, r: 0, b: 0, t: 80 }, // Fix margin
        }}
      />


       {/* 3D Scatter Plot for Angles */}
       <Plot
        useResizeHandler={true}
        style={plotStyle}
        config={plotConfig}
        data={[
          {
            x: lengthData.anglesAlpha, y: lengthData.anglesBeta, z: lengthData.anglesGamma,
            type: 'scatter3d', mode: 'markers',
            marker: {
              size: 5,
              color: lengthData.molecularWeights,
              colorscale: 'Viridis',
              opacity: 0.8,
              colorbar: { title: 'Mol Wt', len: 0.5 }
            }
          }
        ]}
        layout={{
          autosize: true,
          height: 550, // Taller for 3D
          title: { 
            text: '3D Plot: Angles',
            y: 0.95, x: 0.5, xanchor: 'center', yanchor: 'top'
          },
          scene: {
            xaxis: { title: 'Alpha' },
            yaxis: { title: 'Beta' },
            zaxis: { title: 'Gamma' }
          },
          margin: { l: 0, r: 0, b: 0, t: 80 } // Fix margin
        }}
      />
    </div>

    </div>
  );
};

export default DataAnalysis;
