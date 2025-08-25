import React, { useEffect, useRef, useState } from 'react';

const CurveEditor = ({ onCurveGenerated }) => {
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [curveType, setCurveType] = useState('catmullrom');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid(ctx);
    
    // Draw points and curve
    drawPoints(ctx);
    if (points.length > 1) {
      drawCurve(ctx);
    }
  }, [points, curveType]);

  const drawGrid = (ctx) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = 0; x <= 600; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= 400; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }
    
    // Center lines
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.moveTo(0, 200);
    ctx.lineTo(600, 200);
    ctx.stroke();
  };

  const drawPoints = (ctx) => {
    ctx.fillStyle = '#ff4444';
    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw point number
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText(index, point.x + 8, point.y + 4);
      ctx.fillStyle = '#ff4444';
    });
  };

  const drawCurve = (ctx) => {
    if (points.length < 2) return;
    
    ctx.strokeStyle = '#44ff44';
    ctx.lineWidth = 2;
    
    // Create curve based on type
    let curvePoints = [];
    if (curveType === 'catmullrom') {
      curvePoints = generateCatmullRomCurve(points, 100);
    } else if (curveType === 'bezier') {
      curvePoints = generateBezierCurve(points, 100);
    }
    
    // Draw curve
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
    curvePoints.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  };

  const generateCatmullRomCurve = (controlPoints, segments) => {
    const curve = [];
    const n = controlPoints.length;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const u = t * (n - 1);
      const k = Math.floor(u);
      
      if (k === 0) {
        curve.push(controlPoints[0]);
      } else if (k >= n - 1) {
        curve.push(controlPoints[n - 1]);
      } else {
        const u1 = u - k;
        const p0 = controlPoints[k - 1] || controlPoints[0];
        const p1 = controlPoints[k];
        const p2 = controlPoints[k + 1];
        const p3 = controlPoints[k + 2] || controlPoints[n - 1];
        
        const x = 0.5 * (
          (-p0.x + 3*p1.x - 3*p2.x + p3.x) * u1*u1*u1 +
          (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * u1*u1 +
          (-p0.x + p2.x) * u1 +
          2*p1.x
        );
        
        const y = 0.5 * (
          (-p0.y + 3*p1.y - 3*p2.y + p3.y) * u1*u1*u1 +
          (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * u1*u1 +
          (-p0.y + p2.y) * u1 +
          2*p1.y
        );
        
        curve.push({ x, y });
      }
    }
    
    return curve;
  };

  const generateBezierCurve = (controlPoints, segments) => {
    const curve = [];
    const n = controlPoints.length - 1;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let x = 0, y = 0;
      
      for (let j = 0; j <= n; j++) {
        const binomial = factorial(n) / (factorial(j) * factorial(n - j));
        const term = binomial * Math.pow(1 - t, n - j) * Math.pow(t, j);
        x += controlPoints[j].x * term;
        y += controlPoints[j].y * term;
      }
      
      curve.push({ x, y });
    }
    
    return curve;
  };

  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPoints([...points, { x, y }]);
  };

  const clearPoints = () => {
    setPoints([]);
  };

  const removeLastPoint = () => {
    setPoints(points.slice(0, -1));
  };

  const generateCoordinates = () => {
    if (points.length < 2) return;
    
    // Convert canvas coordinates to Three.js coordinates
    // Canvas: (0,0) at top-left, (600,400) at bottom-right
    // Three.js: (0,0) at center, scale appropriately
    const threeJSPoints = points.map(point => {
      const x = (point.x - 300) / 20; // Scale and center
      const y = (200 - point.y) / 20; // Invert Y and center
      const z = Math.random() * 4 - 2; // Random Z for 3D effect
      return { x, y, z };
    });
    
    // Format for Three.js
    const coordinates = threeJSPoints.map(p => 
      `new THREE.Vector3(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})`
    ).join(',\n  ');
    
    const code = `const curve = new THREE.CatmullRomCurve3([
  ${coordinates}
]);`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(code);
    alert('Coordinates copied to clipboard!');
    
    // Also pass to parent component
    if (onCurveGenerated) {
      onCurveGenerated(threeJSPoints);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white' }}>
      <h3>Interactive Curve Editor</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Curve Type:
          <select 
            value={curveType} 
            onChange={(e) => setCurveType(e.target.value)}
            style={{ marginLeft: '5px', padding: '5px' }}
          >
            <option value="catmullrom">Catmull-Rom</option>
            <option value="bezier">Bezier</option>
          </select>
        </label>
        
        <button 
          onClick={clearPoints}
          style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#ff4444' }}
        >
          Clear All
        </button>
        
        <button 
          onClick={removeLastPoint}
          style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#ff8800' }}
        >
          Remove Last
        </button>
        
        <button 
          onClick={generateCoordinates}
          style={{ padding: '8px 16px', backgroundColor: '#44ff44', color: 'black' }}
        >
          Generate Coordinates
        </button>
      </div>
      
      <div style={{ marginBottom: '10px', fontSize: '14px' }}>
        Click on the canvas to add points. The curve will be generated automatically.
        Grid shows 50x50 pixel squares. Center is at (300, 200).
      </div>
      
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ 
          border: '2px solid #666', 
          cursor: 'crosshair',
          backgroundColor: '#000'
        }}
        onClick={handleCanvasClick}
      />
      
      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        Points added: {points.length}
        {points.length > 0 && (
          <div>
            {points.map((point, index) => (
              <span key={index} style={{ marginRight: '10px' }}>
                P{index}: ({Math.round(point.x)}, {Math.round(point.y)})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurveEditor;
