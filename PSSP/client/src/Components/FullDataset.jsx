// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCopy } from '@fortawesome/free-solid-svg-icons';
// import { FaSpinner } from 'react-icons/fa'; // Import Spinner
// import '../Styling/FullDataset.css';

// const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// const FullDataset = () => {
//   // Loading state
//   const [loading, setLoading] = useState(true);

//   const [lengthData, setLengthData] = useState({
//     lengthsA: [], lengthsB: [], lengthsC: [],
//     molecularWeights: [], atomCounts: [],
//     spaceGroups: [], anglesAlpha: [],
//     anglesBeta: [], anglesGamma: []
//   });

//   const [dataHead, setDataHead] = useState([]);
//   const [expandedCells, setExpandedCells] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(20);

//   // Fetch data when component loads
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true); // Start loading

//       try {
//         // Fetch both endpoints simultaneously
//         const [visualizeRes, fullDatasetRes] = await Promise.all([
//           Axios.get(`${baseUrl}/visualize`),
//           Axios.get(`${baseUrl}/fulldataset`)
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
//           molecularWeights, atomCounts,
//           spaceGroups, anglesAlpha, anglesBeta, anglesGamma
//         });

//         // Process Table Data
//         setDataHead(fullDatasetRes.data.data);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false); // Stop loading regardless of success/failure
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

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

//   const filteredData = dataHead.filter((row) =>
//     row.pdb_id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   // Render Spinner if loading
//   if (loading) {
//     return (
//       <div className='full-dataset'>
//          <h1>Dataset</h1>
//          <div className="loading-container">
//             <FaSpinner className="icon-spin" />
//             <p>Loading full dataset...</p>
//          </div>
//       </div>
//     );
//   }

//   return (
//     <div className='full-dataset'>
//       <h1>Dataset</h1>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by PDB ID"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <div className="pagination-controls">
//         <label htmlFor="items-per-page">Rows per page:</label>
//         <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>
//       </div>

//       <div className="table-container">
//         {currentData.length > 0 ? (
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>PDB ID</th>
//                 <th>Chain Code</th>
//                 <th>Input (FASTA Sequence)</th>
//                 <th>DSSP3 (3-state)</th>
//                 <th>DSSP8 (8-state)</th>
//                 <th>Length a (Å)</th>
//                 <th>Length b (Å)</th>
//                 <th>Length c (Å)</th>
//                 <th>Angle Alpha (°)</th>
//                 <th>Angle Beta (°)</th>
//                 <th>Angle Gamma (°)</th>
//                 <th>Space Group</th>
//                 <th>Molecular Weight (kDa)</th>
//                 <th>Deposited Atom Count</th>
//                 <th>Polymer Monomer Count</th>
//                 <th>Modeled Polymer Monomer Count</th>
//                 <th>Unmodeled Polymer Monomer Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.pdb_id}</td>
//                   <td>{row.chain_code}</td>
//                   <td>
//                     <span onClick={() => toggleCellExpansion('input')} style={{ cursor: 'pointer' }}>
//                       {expandedCells['input'] ? row.input : `${row.input.substring(0, 10)}...`}
//                     </span>
//                     <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.input)} className="copy-icon" style={{ marginLeft: '8px' }} />
//                   </td>
//                   <td>
//                     <span onClick={() => toggleCellExpansion('dssp3')} style={{ cursor: 'pointer' }}>
//                       {expandedCells['dssp3'] ? row.dssp3 : `${row.dssp3.substring(0, 10)}...`}
//                     </span>
//                     <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp3)} className="copy-icon" style={{ marginLeft: '8px' }} />
//                   </td>
//                   <td>
//                     <span onClick={() => toggleCellExpansion('dssp8')} style={{ cursor: 'pointer' }}>
//                       {expandedCells['dssp8'] ? row.dssp8 : `${row.dssp8.substring(0, 10)}...`}
//                     </span>
//                     <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp8)} className="copy-icon" style={{ marginLeft: '8px' }} />
//                   </td>
//                   <td>{row['Length a']}</td>
//                   <td>{row['Length b']}</td>
//                   <td>{row['Length c']}</td>
//                   <td>{row['Angle Alpha']}</td>
//                   <td>{row['Angle Beta']}</td>
//                   <td>{row['Angle Gamma']}</td>
//                   <td>{row['Space Group']}</td>
//                   <td>{row['Molecular Weight']}</td>
//                   <td>{row['Deposited Atom Count']}</td>
//                   <td>{row['Polymer Monomer Count']}</td>
//                   <td>{row['Modeled Polymer Monomer Count']}</td>
//                   <td>{row['Unmodeled Polymer Monomer Count']}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No data available.</p>
//         )}
//       </div>

//       <div className="pagination">
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default FullDataset;














import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext'; // Import Context
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FaSpinner } from 'react-icons/fa';
import '../Styling/FullDataset.css';

const FullDataset = () => {
  // 1. CONSUME CONTEXT (No Axios here!)
  const { fullData, loading, loadingProgress } = useContext(DataContext);
  
  const [expandedCells, setExpandedCells] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  // Derived state for filtering
  const [filteredData, setFilteredData] = useState([]);

  // 2. EFFECT: Handle Filtering & Search locally
  // Whenever fullData or searchTerm changes, we update the filtered list
  useEffect(() => {
    if (!fullData) return;

    if (searchTerm === '') {
      setFilteredData(fullData);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const results = fullData.filter((row) =>
        row.pdb_id?.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(results);
    }
    // Reset to page 1 on search
    if (searchTerm !== '') setCurrentPage(1);
  }, [fullData, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  // 3. PAGINATION LOGIC (Client-side slicing)
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // If Context is still fetching the initial load
  if (loading) {
    return (
      <div className='full-dataset'>
         <h1>Dataset</h1>
         <div className="loading-container">
            <FaSpinner className="icon-spin" />
            <p>Loading full dataset... ({loadingProgress} rows)</p>
         </div>
      </div>
    );
  }

  // Safety check
  if (!fullData) return <div className='full-dataset'>Error loading data.</div>;

  return (
    <div className='full-dataset'>
      <h1>Dataset</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by PDB ID"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="pagination-controls">
        <label htmlFor="items-per-page">Rows per page:</label>
        <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="table-container">
        {currentData.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>PDB ID</th>
                <th>Chain Code</th>
                <th>Input (FASTA)</th>
                <th>DSSP3</th>
                <th>DSSP8</th>
                <th>Length a</th>
                <th>Length b</th>
                <th>Length c</th>
                <th>Angle Alpha</th>
                <th>Angle Beta</th>
                <th>Angle Gamma</th>
                <th>Space Group</th>
                <th>Mol Weight</th>
                <th>Atom Count</th>
                <th>Polymer Count</th>
                <th>Modeled</th>
                <th>Unmodeled</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr key={index}>
                  <td>{row.pdb_id}</td>
                  <td>{row.chain_code}</td>
                  <td>
                    <span onClick={() => toggleCellExpansion('input')} style={{ cursor: 'pointer' }}>
                      {expandedCells['input'] ? row.input : `${row.input.substring(0, 10)}...`}
                    </span>
                    <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.input)} className="copy-icon" style={{ marginLeft: '8px' }} />
                  </td>
                  <td>
                    <span onClick={() => toggleCellExpansion('dssp3')} style={{ cursor: 'pointer' }}>
                      {expandedCells['dssp3'] ? row.dssp3 : `${row.dssp3.substring(0, 10)}...`}
                    </span>
                    <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp3)} className="copy-icon" style={{ marginLeft: '8px' }} />
                  </td>
                  <td>
                    <span onClick={() => toggleCellExpansion('dssp8')} style={{ cursor: 'pointer' }}>
                      {expandedCells['dssp8'] ? row.dssp8 : `${row.dssp8.substring(0, 10)}...`}
                    </span>
                    <FontAwesomeIcon icon={faCopy} onClick={() => copyToClipboard(row.dssp8)} className="copy-icon" style={{ marginLeft: '8px' }} />
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
        ) : (
          <p>No data found.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default FullDataset;
