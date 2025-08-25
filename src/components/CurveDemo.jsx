import React, { useState } from 'react';
import CurveEditor from './CurveEditor';

const CurveDemo = () => {
  const [generatedCurve, setGeneratedCurve] = useState(null);

  const handleCurveGenerated = (points) => {
    setGeneratedCurve(points);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white' }}>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          🎨 Custom Curve Path Creator
        </h1>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <CurveEditor onCurveGenerated={handleCurveGenerated} />
          
          {generatedCurve && (
            <div style={{ 
              marginTop: '30px', 
              padding: '20px', 
              backgroundColor: '#2a2a2a', 
              borderRadius: '8px',
              border: '1px solid #444'
            }}>
              <h3>🎯 Generated Three.js Coordinates:</h3>
              <div style={{ 
                backgroundColor: '#1a1a1a', 
                padding: '15px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                overflowX: 'auto'
              }}>
                <code>
                  {`const curve = new THREE.CatmullRomCurve3([
  ${generatedCurve.map(p => 
    `new THREE.Vector3(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})`
  ).join(',\n  ')}
]);`}
                </code>
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <h4>📋 How to use:</h4>
                <ol style={{ lineHeight: '1.6' }}>
                  <li>Copy the code above</li>
                  <li>Paste it into your Background.jsx file</li>
                  <li>Replace the existing curve definition</li>
                  <li>Your planet will now follow your custom path!</li>
                </ol>
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <h4>💡 Tips:</h4>
                <ul style={{ lineHeight: '1.6' }}>
                  <li>Click multiple points to create complex curves</li>
                  <li>Use "Remove Last" to undo mistakes</li>
                  <li>Try both Catmull-Rom and Bezier curve types</li>
                  <li>The grid helps you visualize the coordinate system</li>
                  <li>Coordinates are automatically converted to Three.js format</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurveDemo;
