// import React, { createContext, useState, useEffect } from 'react';
// import Axios from 'axios';

// // Create the context
// export const DataContext = createContext();

// const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// export const DataProvider = ({ children }) => {
//   // 1. GLOBAL STATE
//   // We keep the data here so it doesn't disappear when changing pages
//   const [lengthData, setLengthData] = useState(null);
//   const [dataHead, setDataHead] = useState([]);
//   const [entryCount, setEntryCount] = useState(0);
  
//   // Loading states
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);

//   // 2. FETCH LOGIC
//   useEffect(() => {
//     // If we already have data, DO NOT fetch again!
//     if (lengthData) {
//         setLoading(false);
//         return; 
//     }

//     const fetchAllChunks = async (endpoint) => {
//       let allData = [];
//       let page = 0;
//       let keepFetching = true;

//       while (keepFetching) {
//         try {
//           const res = await Axios.get(`${baseUrl}/${endpoint}?page=${page}`);
//           const chunk = res.data;

//           if (chunk && chunk.length > 0) {
//             allData = [...allData, ...chunk];
//             setLoadingProgress((prev) => prev + chunk.length);
//             page++;
//           } else {
//             keepFetching = false;
//           }
//         } catch (err) {
//           console.error(`Error fetching page ${page}`, err);
//           keepFetching = false;
//         }
//       }
//       return allData;
//     };

//     const loadData = async () => {
//       setLoading(true);
//       try {
//         // Fetch Head (Small request)
//         const headRes = await Axios.get(`${baseUrl}/databank-head`);
//         setDataHead(headRes.data);

//         // Fetch Visualization Data (Chunked)
//         const fullVisualData = await fetchAllChunks('visualize');

//         // Process Data ONCE and store it
//         const processedData = {
//           lengthsA: fullVisualData.map(item => item['Length a']),
//           lengthsB: fullVisualData.map(item => item['Length b']),
//           lengthsC: fullVisualData.map(item => item['Length c']),
//           molecularWeights: fullVisualData.map(item => item['Molecular Weight']),
//           atomCounts: fullVisualData.map(item => item['Deposited Atom Count']),
//           spaceGroups: fullVisualData.map(item => item['Space Group']),
//           anglesAlpha: fullVisualData.map(item => item['Angle Alpha']),
//           anglesBeta: fullVisualData.map(item => item['Angle Beta']),
//           anglesGamma: fullVisualData.map(item => item['Angle Gamma']),
//         };

//         setLengthData(processedData);
//         setEntryCount(fullVisualData.length);
//       } catch (error) {
//         console.error("Context fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []); // Empty dependency array = runs once on app mount

//   return (
//     <DataContext.Provider value={{ lengthData, dataHead, entryCount, loading, loadingProgress }}>
//       {children}
//     </DataContext.Provider>
//   );
// };






















import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const DataContext = createContext();

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export const DataProvider = ({ children }) => {
  // 1. GLOBAL STATE
  const [fullData, setFullData] = useState(null); 
  const [chartData, setChartData] = useState(null); 
  const [entryCount, setEntryCount] = useState(0);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // If we already have data, don't re-fetch
    if (fullData) {
        setLoading(false);
        return; 
    }

    const fetchAllChunks = async () => {
      let allData = [];
      let page = 0; // usually pages start at 1 for some APIs, but 0 for others. Keep your working logic.
      let keepFetching = true;

      // Reset loading state
      setLoading(true);

      while (keepFetching) {
        try {
          // --- CHANGE IS HERE ---
          // Added '&limit=4511' to request larger chunks
          const res = await Axios.get(`${baseUrl}/fulldataset?page=${page}&limit=4511`);
          
          const chunk = res.data.data || res.data; 

          if (chunk && chunk.length > 0) {
            allData = [...allData, ...chunk];
            setLoadingProgress((prev) => prev + chunk.length);
            page++;
          } else {
            keepFetching = false;
          }
        } catch (err) {
          console.error(`Error fetching page ${page}`, err);
          keepFetching = false;
        }
      }
      return allData;
    };

    const loadData = async () => {
      try {
        const rawData = await fetchAllChunks();

        // 1. Store Raw Data
        setFullData(rawData);
        setEntryCount(rawData.length);

        // 2. Derive Chart Data
        const processedCharts = {
          lengthsA: rawData.map(item => item['Length a']),
          lengthsB: rawData.map(item => item['Length b']),
          lengthsC: rawData.map(item => item['Length c']),
          molecularWeights: rawData.map(item => item['Molecular Weight']),
          atomCounts: rawData.map(item => item['Deposited Atom Count']),
          spaceGroups: rawData.map(item => item['Space Group']),
          anglesAlpha: rawData.map(item => item['Angle Alpha']),
          anglesBeta: rawData.map(item => item['Angle Beta']),
          anglesGamma: rawData.map(item => item['Angle Gamma']),
        };
        setChartData(processedCharts);

      } catch (error) {
        console.error("Context fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); 

  return (
    <DataContext.Provider value={{ fullData, chartData, entryCount, loading, loadingProgress }}>
      {children}
    </DataContext.Provider>
  );
};
