const TimeLine = () => {

  return (
<ol
  className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-600"
>
  <li className="relative -ms-1.5 flex items-start gap-4">
    <span className="size-3 shrink-0 rounded-full bg-white"></span>

    <div className="-mt-2">
      <time className="text-xs/none font-medium text-gray-400">12/02/2025</time>

      <h3 className="text-lg font-bold text-white">Kickoff</h3>

      <p className="mt-0.5 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum
        adipisci tenetur sunt quae exercitationem sed pariatur porro!
      </p>
    </div>
  </li>

  <li className="relative -ms-1.5 flex items-start gap-4">
    <span className="size-3 shrink-0 rounded-full bg-white"></span>

    <div className="-mt-2">
      <time className="text-xs/none font-medium text-gray-400">15/03/2025</time>

      <h3 className="text-lg font-bold text-white">First Milestone</h3>

      <p className="mt-0.5 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum
        adipisci tenetur sunt quae exercitationem sed pariatur porro!
      </p>
    </div>
  </li>

  <li className="relative -ms-1.5 flex items-start gap-4">
    <span className="size-3 shrink-0 rounded-full bg-white"></span>

    <div className="-mt-2">
      <time className="text-xs/none font-medium text-gray-400">24/04/2025</time>

      <h3 className="text-lg font-bold text-white">Launch</h3>

      <p className="mt-0.5 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga officiis tempora ipsum
        adipisci tenetur sunt quae exercitationem sed pariatur porro!
      </p>
    </div>
  </li>
</ol>
  )
}

export default TimeLine;
