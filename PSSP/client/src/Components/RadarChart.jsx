import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import '../Styling/RadarChart.css'; 

const RadarChart = ({ pdbId, values }) => {
  const categories = ['Length a', 'Length b', 'Length c', 'Angle Alpha', 'Angle Beta', 'Angle Gamma'];
  const radarValues = [...values, values[0]];

  useEffect(() => {
    // Note: React-Plotly handles loading plotly.js, but keeping your manual script injection if you prefer it.
    // Ideally, install plotly.js via npm and import it to avoid external dependency lag.
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="chart-container"> 
      <Plot
        useResizeHandler={true} // KEY FIX: Enables responsiveness
        style={{ width: '100%', height: '100%' }} // KEY FIX: Fills the container
        data={[
          {
            type: 'scatterpolar',
            r: radarValues,
            theta: [...categories, categories[0]],
            fill: 'toself',
            name: pdbId
          }
        ]}
        layout={{
          autosize: true, // KEY FIX: Auto-calculates size
          title: {
            text: `Radar Chart for PDB ID: ${pdbId}`,
            font: { size: 14 } // Smaller font for mobile
          },
          polar: {
            radialaxis: {
              visible: true,
              range: [0, Math.max(...values)],
            }
          },
          showlegend: false,
          margin: { l: 40, r: 40, b: 40, t: 60 }, // Adjust margins to prevent cutoff
        }}
      />
    </div>
  );
};

export default RadarChart;