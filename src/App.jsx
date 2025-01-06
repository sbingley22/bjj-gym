import React from "react";
import ThreeScene from "./components/ThreeScene.jsx"

function App() {
  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Header */}
      <header className="bg-red-600 py-4 px-2">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BJJ Gym</h1>
          <nav>
            <a href="#about" className="mx-1 hover:underline">
              About
            </a>
            <a href="#moves" className="mx-1 hover:underline">
              Moves
            </a>
            <a href="#classes" className="mx-1 hover:underline">
              Classes
            </a>
            <a href="#contact" className="mx-1 hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          className="hero bg-cover bg-center mt-0"
          style={{
            backgroundImage: "url('/path-to-your-banner.jpg')",
          }}
        >
          <div className="flex items-center justify-center h-full bg-slate-900 bg-opacity-60">
            <h2 className="text-4xl font-bold text-red-500 p-5">Train Like a Champ</h2>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-4 container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-red-500 mb-4">About Us</h3>
          <p className="text-gray-300">
            At BJJ Gym, we believe in empowering individuals through the art of Brazilian Jiu-Jitsu. 
            Our state-of-the-art facilities, experienced instructors, and welcoming community 
            ensure that everyone—whether a beginner or an advanced practitioner—feels at home.
          </p>
        </section>

        {/* Animation */}
        <section id="moves" className="py-4 pb-0 container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-red-500 mb-4">Moves</h3>
          <p className="text-gray-300">
            Watch the type of moves you will could learn even as a complete beginner:
          </p>
          <div className="w-full h-[80vh]">
            <ThreeScene />
          </div>
        </section>

        <section id="classes" className="py-4 pt-0 container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-red-500 mb-4">Our Classes</h3>
          <ul className="text-gray-300 space-y-4">
            <li><strong>Beginner Classes:</strong> Learn the fundamentals in a supportive environment.</li>
            <li><strong>Advanced Training:</strong> Hone your skills with advanced techniques and sparring.</li>
            <li><strong>Kids Classes:</strong> Fun and safe classes for younger enthusiasts.</li>
            <li><strong>Open Mat:</strong> Practice freely and roll with partners of all levels.</li>
          </ul>
        </section>

        <section id="contact" className="py-4 pb-8 container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-red-500 mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-4">
            Reach out to us with any questions, or stop by for a free introductory session!
          </p>
          <div className="flex flex-col space-y-4">
            <p>
              <strong>Email:</strong> contact@bjjgym.com
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p>
              <strong>Address:</strong> 123 BJJ Way, Grapple City, GC 98765
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-red-600 py-4 px-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} BJJ Gym. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
