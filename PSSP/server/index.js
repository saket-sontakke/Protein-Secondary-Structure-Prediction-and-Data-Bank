// // import express from 'express';
// // import dotenv from 'dotenv';
// // import mongoose from 'mongoose';
// // import cors from 'cors';
// // import cookieParser from 'cookie-parser';
// // import axios from 'axios';

// // import { UserRouter } from './routes/user.js';

// // dotenv.config();
// // const app = express();

// // app.use(express.json());

// // // Get the frontend URL from the environment variable
// // const clientURL = process.env.CLIENT_URL;

// // // Configure CORS to trust ONLY that specific URL
// // app.use(cors({
// //     origin: clientURL, // This must match your frontend URL (no trailing slash)
// //     credentials: true  // This allows cookies to be sent
// // }));

// // app.use(cookieParser());

// // const mongoURI = process.env.MONGO_URI;

// // mongoose.connect(mongoURI)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch((error) => {
// //     console.error('Error connecting to MongoDB:', error.message);
// //     process.exit(1);
// //   });

// // process.on('SIGINT', async () => {
// //     await mongoose.connection.close();
// //     console.log('MongoDB connection closed due to app termination');
// //     process.exit(0);
// // });

// // app.use('/auth', UserRouter);

// // // Structure prediction proxy
// // app.post('/predict', async (req, res) => {
// //     try {
// //         const flaskURL = process.env.FLASK_API_URL;
// //         const response = await axios.post(flaskURL, req.body);
// //         res.json(response.data);
// //     } catch (error) {
// //         console.error('Error while predicting structure:', error.message);
// //         res.status(500).json({ error: 'Error while predicting structure' });
// //     }
// // });

// // // Fetch dataset head
// // app.get('/databank-head', async (req, res) => {
// //     try {
// //         const dataBankCollection = mongoose.connection.db.collection('DataBank');
// //         const result = await dataBankCollection.find({}).limit(5).toArray();
// //         res.json(result);
// //     } catch (error) {
// //         console.error('Error fetching dataset head:', error.message);
// //         res.status(500).json({ error: 'Error fetching dataset head' });
// //     }
// // });

// // // Visualization fields
// // app.get('/visualize', async (req, res) => {
// //     try {
// //         if (mongoose.connection.readyState !== 1) {
// //             return res.status(500).json({ error: 'Database not connected' });
// //         }

// //         const result = await mongoose.connection.db.collection('DataBank')
// //             .find({}, {
// //                 projection: {
// //                     'Length a': 1,
// //                     'Length b': 1,
// //                     'Length c': 1,
// //                     'Angle Alpha': 1,
// //                     'Angle Beta': 1,
// //                     'Angle Gamma': 1,
// //                     'Molecular Weight': 1,
// //                     'Deposited Atom Count': 1,
// //                     'Space Group': 1,
// //                     _id: 0
// //                 }
// //             }).toArray();

// //         res.json(result);
// //     } catch (error) {
// //         console.error('Error fetching data for visualization:', error);
// //         res.status(500).json({ error: 'Error fetching data for visualization' });
// //     }
// // });

// // // Fetch by PDB ID
// // app.get('/databank/:pdb_id', async (req, res) => {
// //     const { pdb_id } = req.params;
// //     try {
// //         const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id });
// //         if (result) res.json(result);
// //         else res.status(404).json({ error: 'No data found for the given pdb_id' });
// //     } catch (error) {
// //         console.error('Error fetching data by pdb_id:', error.message);
// //         res.status(500).json({ error: 'Error fetching data' });
// //     }
// // });

// // app.get('/fulldataset', async (req, res) => {
// //     try {
// //         const dataBankCollection = mongoose.connection.db.collection('DataBank');

// //         const result = await dataBankCollection.find({}).toArray();

// //         res.json({
// //             data: result,
// //             totalEntries: result.length
// //         });
// //     } catch (error) {
// //         console.error('Error fetching full dataset:', error.message);
// //         res.status(500).json({ error: 'Error fetching full dataset' });
// //     }
// // });


// // app.use((req, res) => {
// //     res.status(404).json({ error: 'Route not found' });
// // });

// // // --- DEPLOYMENT CHANGE: Added fallback port ---
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}...`);
// // });










// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import axios from 'axios';
// import { UserRouter } from './routes/user.js';

// dotenv.config();
// const app = express();

// const clientURL = process.env.CLIENT_URL;

// // 1. CORS Setup
// const corsOptions = {
//     origin: clientURL,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());

// // 2. CONNECTION CACHING (The Fix for 500 Errors)
// // This prevents the "Cold Start" crash by waiting for DB connection inside the route.
// let isConnected = false; 

// const connectToDatabase = async () => {
//     if (isConnected) {
//         return;
//     }
//     try {
//         const db = await mongoose.connect(process.env.MONGO_URI);
//         isConnected = db.connections[0].readyState === 1;
//         console.log('MongoDB Connected successfully');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         throw new Error('Database connection failed');
//     }
// };

// app.get('/', (req, res) => {
//     res.json({ message: "Backend is active on Vercel!" });
// });

// app.use('/auth', UserRouter);

// // --- ROUTES ---

// app.post('/predict', async (req, res) => {
//     try {
//         const flaskURL = process.env.FLASK_API_URL;
//         const response = await axios.post(flaskURL, req.body);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Structure prediction failed' });
//     }
// });

// app.get('/databank-head', async (req, res) => {
//     try {
//         await connectToDatabase(); // <--- CRITICAL: Wait for connection
//         const result = await mongoose.connection.db.collection('DataBank').find({}).limit(5).toArray();
//         res.json(result);
//     } catch (error) {
//         console.error("Error in /databank-head:", error);
//         res.status(500).json({ error: 'Error fetching head' });
//     }
// });

// // Visualization Route (With Pagination/Chunking)
// app.get('/visualize', async (req, res) => {
//     try {
//         await connectToDatabase(); // <--- CRITICAL: Wait for connection
        
//         const page = parseInt(req.query.page) || 0;
//         const limit = 4511; // Safe chunk size
//         const skip = page * limit;

//         const result = await mongoose.connection.db.collection('DataBank').find({}, {
//             projection: { 'Length a': 1, 'Length b': 1, 'Length c': 1, 'Angle Alpha': 1, 'Angle Beta': 1, 'Angle Gamma': 1, 'Molecular Weight': 1, 'Deposited Atom Count': 1, 'Space Group': 1, _id: 0 }
//         })
//         .skip(skip)
//         .limit(limit)
//         .toArray();
        
//         res.json(result);
//     } catch (error) {
//         console.error("Error in /visualize:", error);
//         res.status(500).json({ error: 'Visualization fetch error' });
//     }
// });

// app.get('/databank/:pdb_id', async (req, res) => {
//     try {
//         await connectToDatabase(); // <--- CRITICAL: Wait for connection
        
//         // Trim whitespace to prevent "not found" errors on bad inputs
//         const pdbId = req.params.pdb_id.trim();
        
//         const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id: pdbId });
        
//         if (result) {
//             res.json(result);
//         } else {
//             res.status(404).json({ error: 'Not found' });
//         }
//     } catch (error) {
//         console.error("Error in /databank/:id:", error);
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });

// // Full Dataset Route (With Pagination/Chunking)
// app.get('/fulldataset', async (req, res) => {
//     try {
//         await connectToDatabase(); // <--- CRITICAL: Wait for connection

//         const page = parseInt(req.query.page) || 0;
//         const limit = 1000;
//         const skip = page * limit;

//         const result = await mongoose.connection.db.collection('DataBank')
//             .find({})
//             .skip(skip)
//             .limit(limit)
//             .toArray();

//         // Returns object { data: [...] }
//         res.json({ data: result });
//     } catch (error) {
//         console.error("Error in /fulldataset:", error);
//         res.status(500).json({ error: 'Error fetching full dataset' });
//     }
// });

// if (process.env.NODE_ENV !== 'production') {
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//         console.log(`Server is running locally on port ${PORT}...`);
//     });
// }

// export default app;















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
