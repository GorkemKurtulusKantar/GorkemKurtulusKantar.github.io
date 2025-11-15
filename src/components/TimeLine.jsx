import { COLORS } from '../constants/colors';

const TimeLine = () => {
  const timelineItems = [
    {
      date: '2023 – Present',
      title: 'Software Developer – Ustunova',
      description:
        'Working as a software developer at Ustunova, building web applications and services using modern JavaScript/TypeScript and backend technologies.',
      color: COLORS.ribbonColors[2] // Blue
    },
    
    {
      date: '2020 – 2025',
      title: 'Ankara University – Computer Engineering',

      color: COLORS.ribbonColors[1] // Teal
    },
    {
      date: '2015 – 2019',
      title: 'Ankara Atatürk Lisesi, Ankara',
      color: COLORS.ribbonColors[0] // Red
    }
   
  ];

  return (
  <div className="bg-neutral-900/80 rounded-3xl shadow-2xl p-6 md:bg-transparent md:rounded-none md:shadow-none md:p-0">
    <ol
      className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-600"
    >
      {timelineItems.map((item, index) => (
        <li key={index} className="relative -ms-1.5 flex items-start gap-4">
          <span 
            className="size-3 shrink-0 rounded-full bg-white transition-all duration-300 ease-in-out  hover:scale-125 hover:shadow-lg"
            style={{
              '--hover-color': item.color
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = item.color;
              e.target.style.boxShadow = `0 0 20px ${item.color}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = 'none';
            }}
          ></span>

          <div className="-mt-2">
            <time className="text-xs/none font-medium text-gray-400">{item.date}</time>

            <h3 className="text-lg font-bold text-white">{item.title}</h3>

            <p className="mt-0.5 text-sm text-gray-300">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </div>
  )
}

export default TimeLine;
