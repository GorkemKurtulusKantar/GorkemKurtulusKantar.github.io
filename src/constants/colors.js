export const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  
  ribbonColors: ['#A8C7DB', '#EA6E44', '#AFC179'],
  
  orbitalColors: [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
  ],
  


  model: {
    houses:   ['#FFFFFF', '#F5F5F5', '#C1440E', '#7A2E1E'],
    treesFoliage: ['#427062', '#33594E', '#234549', '#1E363F'],
    base: ['#E8C2A0', '#D3936B', '#B86A4B', '#7A3B2E'],
    dirt: ['#C49A6C', '#A47148', '#8B5A2B', '#5D4037'],
    treesBark: ['#D2B48C', '#A0522D', '#8B4513', '#5D4037'],
  }
};

export const getRandomTimelineColor = () => {
  const colors = COLORS.timelineColors;
  return colors[Math.floor(Math.random() * colors.length)];
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
