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

















import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import { UserRouter } from './routes/user.js';

dotenv.config();
const app = express();

const clientURL = process.env.CLIENT_URL;

// 1. CORS Setup
const corsOptions = {
    origin: clientURL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// 2. CONNECTION CACHING
let isConnected = false; 

const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
};

app.get('/', (req, res) => {
    res.json({ message: "Backend is active on Vercel!" });
});

app.use('/auth', UserRouter);

// --- ROUTES ---

app.post('/predict', async (req, res) => {
    try {
        const flaskURL = process.env.FLASK_API_URL;
        const response = await axios.post(flaskURL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Structure prediction failed' });
    }
});

app.get('/databank-head', async (req, res) => {
    try {
        await connectToDatabase(); 
        const result = await mongoose.connection.db.collection('DataBank').find({}).limit(5).toArray();
        res.json(result);
    } catch (error) {
        console.error("Error in /databank-head:", error);
        res.status(500).json({ error: 'Error fetching head' });
    }
});

// Visualization Route
app.get('/visualize', async (req, res) => {
    try {
        await connectToDatabase(); 
        
        const page = parseInt(req.query.page) || 0;
        // UPDATED: Use query limit if provided, otherwise default to 4511
        const limit = parseInt(req.query.limit) || 4511; 
        const skip = page * limit;

        const result = await mongoose.connection.db.collection('DataBank').find({}, {
            projection: { 'Length a': 1, 'Length b': 1, 'Length c': 1, 'Angle Alpha': 1, 'Angle Beta': 1, 'Angle Gamma': 1, 'Molecular Weight': 1, 'Deposited Atom Count': 1, 'Space Group': 1, _id: 0 }
        })
        .skip(skip)
        .limit(limit)
        .toArray();
        
        res.json(result);
    } catch (error) {
        console.error("Error in /visualize:", error);
        res.status(500).json({ error: 'Visualization fetch error' });
    }
});

app.get('/databank/:pdb_id', async (req, res) => {
    try {
        await connectToDatabase(); 
        const pdbId = req.params.pdb_id.trim();
        const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id: pdbId });
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch (error) {
        console.error("Error in /databank/:id:", error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Full Dataset Route 
app.get('/fulldataset', async (req, res) => {
    try {
        await connectToDatabase(); 

        const page = parseInt(req.query.page) || 0;
        // UPDATED: Now checks req.query.limit first!
        const limit = parseInt(req.query.limit) || 1000; 
        const skip = page * limit;

        const result = await mongoose.connection.db.collection('DataBank')
            .find({})
            .skip(skip)
            .limit(limit)
            .toArray();

        res.json({ data: result });
    } catch (error) {
        console.error("Error in /fulldataset:", error);
        res.status(500).json({ error: 'Error fetching full dataset' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}...`);
    });
}

export default app;
