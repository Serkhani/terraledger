const FeaturedSales = () => {
  return (
    <section className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-5">Featured Sales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} className="card">
            <img src="/assets/land.svg" alt="Land" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">500 000.000 GH₵</h3>
              <p>Land for sale</p>
              <p>London, Oxford St.</p>
              <p>26 November 2020</p>
              <div className="flex items-center">
                <img src="/assets/land-size-icon.svg" alt="Land Size Icon" className="w-5 h-5 mr-2" />
                <p>
                  150 m<sup>2</sup>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSales;
