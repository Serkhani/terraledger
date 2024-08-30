import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <a className="text-xl font-bold">Terraledsor</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" passHref>
              <a className={pathname === "/" ? "text-primary" : ""}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/browse-lands" passHref>
              <a className={pathname === "/browse-lands" ? "text-primary" : ""}>Browse Lands</a>
            </Link>
          </li>
          <li>
            <Link href="/about-us" passHref>
              <a className={pathname === "/about-us" ? "text-primary" : ""}>About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/contact-us" passHref>
              <a className={pathname === "/contact-us" ? "text-primary" : ""}>Contact Us</a>
            </Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <button className="btn btn-primary">Advertise</button>
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
