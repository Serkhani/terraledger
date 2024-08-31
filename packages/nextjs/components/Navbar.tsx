"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-primary-content">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-xl font-bold">
          Terraledger
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/land-for-sale" className={pathname === "/browse-lands" ? "font-bold" : ""}>
              Browse Lands
            </Link>
          </li>
          <li>
            <Link href="/about-us" className={pathname === "/about-us" ? "font-bold" : ""}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className={pathname === "/contact-us" ? "font-bold" : ""}>
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="flex space-x-4 items-center">
          <Link href="/advertise-land" className="btn btn-sm btn-secondary">
            Advertise
          </Link>
          <button className="btn btn-sm btn-secondary">Login</button>
          <RainbowKitCustomConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
