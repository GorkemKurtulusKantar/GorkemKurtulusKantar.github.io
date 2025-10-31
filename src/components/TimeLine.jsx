import { COLORS } from '../constants/colors';

const TimeLine = () => {
  const timelineItems = [
    {
      date: '12/02/2025',
      title: 'Kickoff',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum adipisci tenetur sunt quae exercitationem sed pariatur porro!',
      color: COLORS.ribbonColors[0] // Red
    },
    {
      date: '15/03/2025', 
      title: 'First Milestone',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum adipisci tenetur sunt quae exercitationem sed pariatur porro!',
      color: COLORS.ribbonColors[1] // Teal
    },
    {
      date: '24/04/2025',
      title: 'Launch', 
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum adipisci tenetur sunt quae exercitationem sed pariatur porro!',
      color: COLORS.ribbonColors[2] // Blue
    }
  ];

  return (
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
  )
}

export default TimeLine;
