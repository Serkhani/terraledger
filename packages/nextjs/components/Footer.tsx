const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-3">TerraLedger</h3>
          <ul>
            <li>About Us</li>
            <li>Our Awards</li>
            <li>Corporate Materials</li>
            <li>Advertisement</li>
            <li>Human Resources</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Our Services</h3>
          <ul>
            <li>Our Special Services</li>
            <li>Membership</li>
            <li>Corporate Membership</li>
            <li>Projects</li>
            <li>Advertise For Free</li>
            <li>Search On Map</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Other</h3>
          <ul>
            <li>Posting Rules</li>
            <li>Terms of Use</li>
            <li>Membership Agreement and Privacy Policy</li>
            <li>Operation Guide</li>
            <li>Cookie Policy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
