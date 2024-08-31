import Link from "next/link";

const LandGrid = () => {
  const lands = Array(12).fill({
    price: "6000000.00 $",
    title: "Land for sale",
    location: "East Legon Hills.",
    date: "26 November 2020",
    size: "150 m²",
    image: "/assets/land.svg",
  });

  return (
    <section className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-5">
        Land for sale <span className="text-gray-500 text-lg">132.569 results found</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lands.map((land, index) => (
          <Link href="/single-land-details" key={index}>
            <div className="card bg-base-100 shadow-xl cursor-pointer transition-transform hover:scale-105">
              <figure>
                <img src={land.image} alt="Land" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{land.price}</h2>
                <p>{land.title}</p>
                <p>{land.location}</p>
                <p>{land.date}</p>
                <div className="flex items-center">
                  <img src="/assets/land-size-icon.svg" alt="Land Size Icon" className="w-5 h-5 mr-2" />
                  <p>{land.size}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LandGrid;
