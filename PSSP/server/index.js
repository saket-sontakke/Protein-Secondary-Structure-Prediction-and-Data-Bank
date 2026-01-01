// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import axios from 'axios';

// import { UserRouter } from './routes/user.js';

// dotenv.config();
// const app = express();

// app.use(express.json());

// // Get the frontend URL from the environment variable
// const clientURL = process.env.CLIENT_URL;

// // Configure CORS to trust ONLY that specific URL
// app.use(cors({
//     origin: clientURL, // This must match your frontend URL (no trailing slash)
//     credentials: true  // This allows cookies to be sent
// }));

// app.use(cookieParser());

// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   });

// process.on('SIGINT', async () => {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed due to app termination');
//     process.exit(0);
// });

// app.use('/auth', UserRouter);

// // Structure prediction proxy
// app.post('/predict', async (req, res) => {
//     try {
//         const flaskURL = process.env.FLASK_API_URL;
//         const response = await axios.post(flaskURL, req.body);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error while predicting structure:', error.message);
//         res.status(500).json({ error: 'Error while predicting structure' });
//     }
// });

// // Fetch dataset head
// app.get('/databank-head', async (req, res) => {
//     try {
//         const dataBankCollection = mongoose.connection.db.collection('DataBank');
//         const result = await dataBankCollection.find({}).limit(5).toArray();
//         res.json(result);
//     } catch (error) {
//         console.error('Error fetching dataset head:', error.message);
//         res.status(500).json({ error: 'Error fetching dataset head' });
//     }
// });

// // Visualization fields
// app.get('/visualize', async (req, res) => {
//     try {
//         if (mongoose.connection.readyState !== 1) {
//             return res.status(500).json({ error: 'Database not connected' });
//         }

//         const result = await mongoose.connection.db.collection('DataBank')
//             .find({}, {
//                 projection: {
//                     'Length a': 1,
//                     'Length b': 1,
//                     'Length c': 1,
//                     'Angle Alpha': 1,
//                     'Angle Beta': 1,
//                     'Angle Gamma': 1,
//                     'Molecular Weight': 1,
//                     'Deposited Atom Count': 1,
//                     'Space Group': 1,
//                     _id: 0
//                 }
//             }).toArray();

//         res.json(result);
//     } catch (error) {
//         console.error('Error fetching data for visualization:', error);
//         res.status(500).json({ error: 'Error fetching data for visualization' });
//     }
// });

// // Fetch by PDB ID
// app.get('/databank/:pdb_id', async (req, res) => {
//     const { pdb_id } = req.params;
//     try {
//         const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id });
//         if (result) res.json(result);
//         else res.status(404).json({ error: 'No data found for the given pdb_id' });
//     } catch (error) {
//         console.error('Error fetching data by pdb_id:', error.message);
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });

// app.get('/fulldataset', async (req, res) => {
//     try {
//         const dataBankCollection = mongoose.connection.db.collection('DataBank');

//         const result = await dataBankCollection.find({}).toArray();

//         res.json({
//             data: result,
//             totalEntries: result.length
//         });
//     } catch (error) {
//         console.error('Error fetching full dataset:', error.message);
//         res.status(500).json({ error: 'Error fetching full dataset' });
//     }
// });


// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// // --- DEPLOYMENT CHANGE: Added fallback port ---
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}...`);
// });











import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import { UserRouter } from './routes/user.js';

dotenv.config();
const app = express();

// 1. Enhanced CORS Configuration
// We define the options explicitly to match your vercel.json headers
const clientURL = process.env.CLIENT_URL; // This must be: https://saket-sontakke-pssp.onrender.com

const corsOptions = {
    origin: clientURL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// 2. Handle Preflight Requests Explicitly
// This is crucial for Vercel. It forces Express to respond "OK" to the browser's initial check.
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// 3. Database Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// 4. Routes
app.get('/', (req, res) => {
    res.json({ message: "Backend is active on Vercel!" });
});

app.use('/auth', UserRouter);

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
        const result = await mongoose.connection.db.collection('DataBank').find({}).limit(5).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching head' });
    }
});

app.get('/visualize', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) return res.status(500).json({ error: 'DB not connected' });
        const result = await mongoose.connection.db.collection('DataBank').find({}, {
            projection: { 'Length a': 1, 'Length b': 1, 'Length c': 1, 'Angle Alpha': 1, 'Angle Beta': 1, 'Angle Gamma': 1, 'Molecular Weight': 1, 'Deposited Atom Count': 1, 'Space Group': 1, _id: 0 }
        }).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Visualization fetch error' });
    }
});

app.get('/databank/:pdb_id', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id: req.params.pdb_id });
        result ? res.json(result) : res.status(404).json({ error: 'Not found' });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.get('/fulldataset', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('DataBank').find({}).toArray();
        res.json({ data: result, totalEntries: result.length });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching full dataset' });
    }
});

// 5. Local Development Listener
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}...`);
    });
}

// 6. Export for Vercel
export default app;
