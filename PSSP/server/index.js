// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import axios from 'axios';

// // Import routes
// import { UserRouter } from './routes/user.js';

// // Load environment variables from `.env` file
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//     origin: process.env.CLIENT_URL, 
//     credentials: true
// }));
// app.use(cookieParser());

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit the app if the DB connection fails
//   });

// // Gracefully close MongoDB connection when server shuts down
// process.on('SIGINT', async () => {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed due to app termination');
//     process.exit(0);
// });

// // Routes
// app.use('/auth', UserRouter);  // User authentication routes

// // Proxy route to send requests to Flask API for structure prediction
// app.post('/predict', async (req, res) => {
//     try {
//         const flaskURL = process.env.FLASK_API_URL;
//         const response = await axios.post(flaskURL, req.body);  // Forward request to Flask app
//         res.json(response.data);  // Send Flask response back to client
//     } catch (error) {
//         console.error('Error while predicting structure:', error.message);
//         res.status(500).json({ error: 'Error while predicting structure' });
//     }
// });

// // Route to fetch the first few entries (head) of the dataset
// app.get('/databank-head', async (req, res) => {
//     try {
//         const dataBankCollection = mongoose.connection.db.collection('DataBank');
//         const result = await dataBankCollection.find({}, { limit: 5 }).toArray();  // Fetch first 5 entries
//         res.json(result);
//     } catch (error) {
//         console.error('Error fetching dataset head:', error.message);
//         res.status(500).json({ error: 'Error fetching dataset head' });
//     }
// });

// // Route to fetch the first few entries (head) of the dataset
// app.get('/fulldataset', async (req, res) => {
//     try {
//         const dataBankCollection = mongoose.connection.db.collection('DataBank');
        
//         // Retrieve limit from query parameter or default to fetching all entries
//         const limit = parseInt(req.query.limit) || 0;  // 0 fetches all entries with MongoDB

//         const result = await dataBankCollection.find({}).limit(limit).toArray();
//         res.json(result);
//     } catch (error) {
//         console.error('Error fetching dataset head:', error.message);
//         res.status(500).json({ error: 'Error fetching dataset head' });
//     }
// });


// // Route to fetch all lengths, molecular weights, deposited atom count, and space group for visualization
// app.get('/visualize', async (req, res) => {
//     try {
//         // Ensure the connection is ready
//         if (mongoose.connection.readyState !== 1) {
//             return res.status(500).json({ error: 'Database not connected' });
//         }

//         // Fetch the required fields from MongoDB
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
//             })
//             .toArray();

//         // Send data to frontend
//         res.json(result);
//     } catch (error) {
//         console.error('Error fetching data for visualization:', error);
//         res.status(500).json({ error: 'Error fetching data for visualization' });
//     }
// });

// // Route to fetch data by pdb_id
// app.get('/databank/:pdb_id', async (req, res) => {
//     const { pdb_id } = req.params;
//     try {
//         const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id });
//         if (result) {
//             res.json(result);
//         } else {
//             res.status(404).json({ error: 'No data found for the given pdb_id' });
//         }
//     } catch (error) {
//         console.error('Error fetching data by pdb_id:', error.message);
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });

// // Route to fetch the entire dataset (with optional pagination)
// app.get('/fulldataset', async (req, res) => {
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const limit = parseInt(req.query.limit) || 100; // Default to 100 entries per page if not provided

//     try {
//         const dataBankCollection = mongoose.connection.db.collection('DataBank');
        
//         // Calculate the number of documents to skip based on the current page
//         const skip = (page - 1) * limit;

//         // Fetch dataset with pagination
//         const result = await dataBankCollection.find({})
//             .skip(skip)
//             .limit(limit)
//             .toArray();

//         // Get the total count of documents in the collection
//         const totalDocuments = await dataBankCollection.countDocuments();

//         // Send the result and metadata about pagination
//         res.json({
//             data: result,
//             currentPage: page,
//             totalPages: Math.ceil(totalDocuments / limit),
//             totalEntries: totalDocuments
//         });
//     } catch (error) {
//         console.error('Error fetching full dataset:', error.message);
//         res.status(500).json({ error: 'Error fetching full dataset' });
//     }
// });

// // Fallback for undefined routes
// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// // Server setup
// const PORT = process.env.PORT;
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

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

app.use('/auth', UserRouter);

// Structure prediction proxy
app.post('/predict', async (req, res) => {
    try {
        const flaskURL = process.env.FLASK_API_URL;
        const response = await axios.post(flaskURL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error while predicting structure:', error.message);
        res.status(500).json({ error: 'Error while predicting structure' });
    }
});

// Fetch dataset head
app.get('/databank-head', async (req, res) => {
    try {
        const dataBankCollection = mongoose.connection.db.collection('DataBank');
        const result = await dataBankCollection.find({}).limit(5).toArray();
        res.json(result);
    } catch (error) {
        console.error('Error fetching dataset head:', error.message);
        res.status(500).json({ error: 'Error fetching dataset head' });
    }
});

// Visualization fields
app.get('/visualize', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ error: 'Database not connected' });
        }

        const result = await mongoose.connection.db.collection('DataBank')
            .find({}, {
                projection: {
                    'Length a': 1,
                    'Length b': 1,
                    'Length c': 1,
                    'Angle Alpha': 1,
                    'Angle Beta': 1,
                    'Angle Gamma': 1,
                    'Molecular Weight': 1,
                    'Deposited Atom Count': 1,
                    'Space Group': 1,
                    _id: 0
                }
            }).toArray();

        res.json(result);
    } catch (error) {
        console.error('Error fetching data for visualization:', error);
        res.status(500).json({ error: 'Error fetching data for visualization' });
    }
});

// Fetch by PDB ID
app.get('/databank/:pdb_id', async (req, res) => {
    const { pdb_id } = req.params;
    try {
        const result = await mongoose.connection.db.collection('DataBank').findOne({ pdb_id });
        if (result) res.json(result);
        else res.status(404).json({ error: 'No data found for the given pdb_id' });
    } catch (error) {
        console.error('Error fetching data by pdb_id:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.get('/fulldataset', async (req, res) => {
    try {
        const dataBankCollection = mongoose.connection.db.collection('DataBank');

        const result = await dataBankCollection.find({}).toArray();

        res.json({
            data: result,
            totalEntries: result.length
        });
    } catch (error) {
        console.error('Error fetching full dataset:', error.message);
        res.status(500).json({ error: 'Error fetching full dataset' });
    }
});


app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
