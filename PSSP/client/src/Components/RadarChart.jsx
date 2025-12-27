import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import '../Styling/RadarChart.css'; // Make sure this file exists

const RadarChart = ({ pdbId, values }) => {
  const categories = ['Length a', 'Length b', 'Length c', 'Angle Alpha', 'Angle Beta', 'Angle Gamma'];
  const radarValues = [...values, values[0]];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="chart-container"> {/* Add a wrapper for the chart */}
      <Plot
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
          title: `Radar Chart for PDB ID: ${pdbId}`,
          polar: {
            radialaxis: {
              visible: true,
              range: [0, Math.max(...values)],
            }
          },
          showlegend: false,
        }}
      />
    </div>
  );
};

export default RadarChart;
