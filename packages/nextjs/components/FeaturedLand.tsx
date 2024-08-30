"use client";

import Link from "next/link";

const FeaturedLand = () => {
  return (
    <section className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-5">Featured Lands</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "East Legon lands",
          "Amasaman Lands",
          "Burkina Lands",
          "East Legon lands",
          "Amasaman Lands",
          "Burkina Lands",
        ].map((land, index) => (
          <div key={index} className="card">
            <img src="/assets/land-2.svg" alt="Land" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{land}</h3>
              <p>The privileged location in Lambeth region in the west of London city.</p>
              <p>The project is close to many hotels, hospitals and commercial centers...</p>
              <Link href="/land-for-sale" className="btn btn-primary mt-2">
                View Lands
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLand;
