const FilterSection = () => {
  return (
    <section className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <select className="select select-bordered">
            <option disabled selected>
              Province
            </option>
            <option>Province 1</option>
            <option>Province 2</option>
          </select>
          <select className="select select-bordered">
            <option disabled selected>
              Area
            </option>
            <option>Area 1</option>
            <option>Area 2</option>
          </select>
          <select className="select select-bordered">
            <option disabled selected>
              Price
            </option>
            <option>$0 - $100,000</option>
            <option>$100,000 - $200,000</option>
          </select>
          <select className="select select-bordered">
            <option disabled selected>
              Size (M²)
            </option>
            <option>0 - 1000</option>
            <option>1000 - 2000</option>
          </select>
          <select className="select select-bordered">
            <option disabled selected>
              Location
            </option>
            <option>Location 1</option>
            <option>Location 2</option>
          </select>
        </div>
        <button className="btn btn-primary">Search</button>
      </div>
    </section>
  );
};

export default FilterSection;
