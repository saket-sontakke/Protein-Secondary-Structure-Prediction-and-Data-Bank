import axios from 'axios';
import React, { useState } from 'react';
import Plot from 'react-plotly.js'; 
import '../Styling/StructurePrediction.css';
import { useNavigate } from 'react-router-dom';


// Dictionary for average molecular weights of amino acids in Daltons
const aminoAcidWeights = {
    'A': 89.09, 'C': 121.15, 'D': 133.10, 'E': 147.13, 'F': 165.19, 'G': 75.07,
    'H': 155.16, 'I': 131.17, 'K': 146.19, 'L': 131.17, 'M': 149.21, 'N': 132.12,
    'P': 115.13, 'Q': 146.15, 'R': 174.20, 'S': 105.09, 'T': 119.12, 'V': 117.15,
    'W': 204.23, 'Y': 181.19
};

// Function to calculate molecular weight in kDa
const calculateMolecularWeight = (sequence) => {
    let weight = 0;
    for (let aminoAcid of sequence) {
        weight += aminoAcidWeights[aminoAcid] || 0;
    }
    // Subtract mass of water for peptide bonds
    const weight_kDa = (weight - (sequence.length - 1) * 18.015) / 1000;
    return weight_kDa.toFixed(2); // Return rounded weight
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

const StructurePrediction = () => {
    const navigate = useNavigate();
    const [sequence, setSequence] = useState('');
    const [predictedSS, setPredictedSS] = useState(null);
    const [molecularWeight, setMolecularWeight] = useState(null); // Updated state for estimated molecular weight
    const [plotData, setPlotData] = useState([]); // Plot data state
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    const sampleSequences = [
        'TTCCPSIVARSNFNVCRLPGTPEALCATYTGCIIIPGATCPGDYAN',
        'LKCNKLIPIAYKTCPEGKNLCYKMMLASKKMVPVKRGCINVCPKNSALVKYVCCSTDRCN',
        'AAPCFCSGKPGRGDLWILRGTCPGGYGYTSNCYKWPNICCYPH',
        'EISGHIVRSPMVGTFYRTPSPDAKAFIEVGQKVNVGDTLCIVEAMKMMNQIEADKSGTVKAILVESGQPVEFDEPLVVIE',
        'ATGGYVQQATGQASFTMYSGCGSPACGKAASGFTAAINQLAFGSAPGLGAGDACGRCFALTGNHDPYSPNYTGPFGQTIVVKVTDLCPVQGNQEFCGQTTSNPTNQHGMPFHFDICEDTGGSAKFFPSGHGALTGTFTEVSCSQWSGSDGGQLWNGACLSGETAPNWPSTACGNKGTAPS',
    ];

    const isValidInput = (input) => /^[A-Z]*$/.test(input); // Validate for uppercase letters only

    const handleChange = (e) => {
        const input = e.target.value.toUpperCase();
        setSequence(input);

        if (!isValidInput(input)) {
            setError('Invalid input. Please enter only valid amino acids.');
            setPredictedSS(null);
            setMolecularWeight(null); // Clear molecular weight if invalid
        } else {
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (sequence.length > 512) {
        //     setError('Max length exceeded (Make sure the input sequence <=512)');
        //     setPredictedSS(null);
        //     setMolecularWeight(null);
        //     return;
        // }

        if (sequence.length > 512) {
            setError('Max length exceeded (Make sure the input sequence <=512)');
            setPredictedSS(null);
            setMolecularWeight(null);
            return;
        }

        const validAminoAcids = /^[ARNDCQEGHILKMFPSTWYV]+$/;
        if (!validAminoAcids.test(sequence)) {
            setError(<>
                Invalid amino acid sequence.<br />
                The sequence must only contain standard amino acids:<br />
                A R N D C Q E G H I L K M F P S T W Y V
            </>);
            setPredictedSS(null);
            setMolecularWeight(null);
            return;
        }

        try {
            // Step 1: Calculate molecular weight (but do not set it immediately)
            const estimatedMW = calculateMolecularWeight(sequence);

            // Step 2: Fetch secondary structure prediction from the API
            const response = await axios.post('http://localhost:5000/predict', { sequence });
            const prediction = response.data.predicted_ss;

            // Step 3: Generate plot data
            const plotData = aminoAcidClusters(sequence, prediction);

            // Step 4: Now set both the molecular weight and prediction at the same time
            setMolecularWeight(estimatedMW); // Now set molecular weight
            setPredictedSS(prediction);       // Now set secondary structure prediction
            setPlotData(plotData);            // Now set plot data

            // Update history
            setHistory([{ sequence, prediction }, ...history]);

            setError(null); // Clear any previous error
        } catch (err) {
            console.error('Error predicting structure:', err);
            setError('Failed to retrieve structure');
            setPredictedSS(null);
            setMolecularWeight(null);
            setPlotData([]); // Clear plot data if error
        }
    };

    return (
        <div className="structure-prediction-container">
            <h1>Protein Secondary Structure Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Amino Acid Sequence:
                    <input
                        type="text"
                        value={sequence}
                        onChange={handleChange}
                        required
                    />
                </label>

                {error && <p style={{ color: 'red', marginBottom: '2rem' }}>{error}</p>}
                <button type="submit" disabled={error !== null}>Predict Structure</button>
            </form>

            {(predictedSS || molecularWeight) && (
                <div className="prediction-container">
                    {predictedSS && (
                        <>
                            <h2>Predicted Secondary Structure:</h2>
                            <p className="prediction-text">{predictedSS}</p>
                        </>
                    )}
                    {molecularWeight && (
                        <>
                            <h2>Estimated Molecular Weight:</h2>
                            <p className="prediction-text">{molecularWeight} kDa</p>
                        </>
                    )}
                </div>
            )}

            {/* Plot Component */}
            {plotData.length > 0 && (
                <div className="plot-container">
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
                            width: 950,
                            height: 400
                        }}
                    />
                </div>
            )}

            <div className="sample-sequence">
                <span>Sample Sequences:</span>
                {sampleSequences.map((seq, index) => (
                    <button
                        key={index}
                        className="sample-sequence-button"
                        onClick={() => setSequence(seq)}
                    >
                        {seq}
                    </button>
                ))}
            </div>

            <p style={{ marginBottom: '3rem', marginTop:'2rem' }}>
            Want to know more about our AI model?
            <span
                onClick={() => navigate('/Resources')} 
                style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px'}} 
            >
                click here.
            </span>
            </p>

            {/* {history.length > 0 && (
                <div className="search-history">
                    <h2>Search History</h2>
                    <table className='table1'>
                        <thead>
                            <tr>
                                <th>Sequence</th>
                                <th>Prediction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.sequence}</td>
                                    <td>{entry.prediction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )} */}
        </div>
    );
};

export default StructurePrediction;

