import MindyRunning01 from "../assets/mindy_running_01.jpg";
const stats = [
  { id: 1, name: "Steps Taken", value: "3,000,000+" },
  { id: 2, name: "Miles on Miles", value: "1,700+" },
  { id: 3, name: "Probability of being related to lions", value: "99.9%" },
  { id: 4, name: "Net Worth", value: "$70M" },
];

export default function Stats() {
  return (
    <div className="relative bg-whitel">
      <img
        alt=""
        src={MindyRunning01}
        className="h-72 w-full bg-gray-50 object-cover lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2"
      />
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="px-6 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
            <h2 className="text-base font-semibold leading-8 text-emerald-600">
              My Track Record
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fitness Stats
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Who knew tracking steps could be this fun? Walking my way to
              success, one step at a time. Because even a lion needs its daily
              stroll. 🦁
            </p>
            <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6"
                >
                  <dt className="text-sm leading-6 text-gray-600">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
