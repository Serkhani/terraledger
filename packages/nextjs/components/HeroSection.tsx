"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-base-200 py-20 min-h-[60vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/hero-image.svg')",
          filter: "brightness(0.7)",
        }}
      ></div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Welcome to Terraledger</h1>
        <p className="text-xl md:text-2xl mb-8 text-white">Find your perfect land with ease</p>
        <Link href="/LandsForSale" className="btn btn-primary btn-lg">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
