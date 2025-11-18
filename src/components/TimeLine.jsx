const TimeLine = () => {
  const timelineItems = [
    {
      date: '2023 – Present',
      title: 'Software Developer – Ustunova',
      description:
        'Worked 2 years as a software developer at Ustunova, building web applications and services using React and Python.',
    },
    
    {
      date: '2020 – 2025',
      title: 'Ankara University – Computer Engineering',
    },
    {
      date: '2015 – 2019',
      title: 'Ankara Atatürk Lisesi, Ankara',
    }
   
  ];

  return (
  <div className="bg-neutral-900/80 rounded-3xl shadow-2xl p-6 md:bg-transparent md:rounded-none md:shadow-none md:p-0 w-full">
    <ol
      className="relative space-y-8  before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-600"
    >
      {timelineItems.map((item, index) => (
        <li key={index} className="relative -ms-1.5 flex items-start gap-4">

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
