// Color constants for the application
export const COLORS = {
  // Primary theme colors
  primary: '#3B82F6',
  secondary: '#10B981',
  
  // Ribbon colors (from App.jsx)
  ribbonColors: ['#754d45', '#284261', '#55a058'],
  
  // Orbital ball colors (from Background.jsx)
  orbitalColors: [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
  ],
  

  
  // Pixel card variants
  pixelColors: {
    blue: ['#e0f2fe', '#7dd3fc', '#0ea5e9'],
    yellow: ['#fef08a', '#fde047', '#eab308'],
    pink: ['#fecdd3', '#fda4af', '#e11d48'],
    default: ['#f8fafc', '#f1f5f9', '#cbd5e1']
  }
};

// Helper function to get random timeline color
export const getRandomTimelineColor = () => {
  const colors = COLORS.timelineColors;
  return colors[Math.floor(Math.random() * colors.length)];
};

// Helper function to convert hex to RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
