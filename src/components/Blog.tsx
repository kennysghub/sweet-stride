const posts = [
  {
    id: 1,
    title: "Step by Step: The Journey to Fitness",
    href: "#",
    description:
      "Discover how tracking your daily steps can lead to amazing health benefits and keep you motivated every day. Small steps lead to big changes!",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Oct 19, 2023",
    datetime: "2023-10-19",
    author: {
      name: "Kieu Tien Mindy",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQGb4hXRs1jb5w/profile-displayphoto-shrink_400_400/0/1711236582247?e=1727308800&v=beta&t=Omm7-qUzUS0iHUZxQjixShXrUGizpGs-C0ntTBA5QoA",
    },
  },
  {
    id: 2,
    title: "Writing My Way to Fitness Success",
    href: "#",
    description:
      "Explore the power of journaling in your fitness journey. Learn how documenting your progress can boost motivation and keep you on track.",
    imageUrl:
      "https://images.pexels.com/photos/1018133/pexels-photo-1018133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "Jun 11, 2024",
    datetime: "2024-06-11",
    author: {
      name: "Kieu Tien Mindy",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQGb4hXRs1jb5w/profile-displayphoto-shrink_400_400/0/1711236582247?e=1727308800&v=beta&t=Omm7-qUzUS0iHUZxQjixShXrUGizpGs-C0ntTBA5QoA",
    },
  },
  {
    id: 3,
    title: "How I Built My Fitness Routine",
    href: "#",
    description:
      "Building a fitness routine can feel like building a startup! Read on to find out how I created a sustainable fitness plan that works for me.",
    imageUrl:
      "https://images.pexels.com/photos/749569/pexels-photo-749569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "Jan 15, 2023",
    datetime: "2023-01-15",
    author: {
      name: "Kieu Tien Mindy",
      imageUrl:
        "https://media.licdn.com/dms/image/D5603AQGb4hXRs1jb5w/profile-displayphoto-shrink_400_400/0/1711236582247?e=1727308800&v=beta&t=Omm7-qUzUS0iHUZxQjixShXrUGizpGs-C0ntTBA5QoA",
    },
  },
  // More posts...
];

export default function Blog() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Some of my long-form thoughts on running, writing, data science, and
            more.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                alt=""
                src={post.imageUrl}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.datetime} className="mr-8">
                  {post.date}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img
                      alt=""
                      src={post.author.imageUrl}
                      className="h-6 w-6 flex-none rounded-full bg-white/10"
                    />
                    {post.author.name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
