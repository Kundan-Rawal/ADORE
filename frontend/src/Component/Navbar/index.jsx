import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-amber-400 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <img
        className="h-12 w-12 rounded-full"
        src="https://scontent.fbho3-5.fna.fbcdn.net/v/t39.30808-1/348266662_1481664139321064_8379212154246497440_n.png?stp=dst-png_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=mm--qLW7MygQ7kNvwE17iA7&_nc_oc=AdnjSutr7xdbVnDULo4qGfZNb2e9VL0Zo_K9gFpIdrTyQIZyBuqPHb1hIWm-zxcDmHW338FvAkrIjX0qZjPppQKL&_nc_zt=24&_nc_ht=scontent.fbho3-5.fna&_nc_gid=k9fe9Qtq7XRx2uGid5Axkg&oh=00_AfV76hhIC0RhNcjBSRY2tzj_UdF3-bCqA04_hvlc9PZPAw&oe=68B63C4A"
        alt="Logo"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-lg font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/profile">
          <img
            src="https://as1.ftcdn.net/v2/jpg/05/78/83/56/1000_F_578835615_liuR85qKaLik6kXDlOIYbdLFaL5pXbmY.jpg"
            className="rounded-full h-10 w-10"
            alt="Profile"
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-6 bg-amber-300 shadow-lg rounded-lg flex flex-col gap-4 p-4 w-48 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <img
              src="https://as1.ftcdn.net/v2/jpg/05/78/83/56/1000_F_578835615_liuR85qKaLik6kXDlOIYbdLFaL5pXbmY.jpg"
              className="rounded-full h-10 w-10"
              alt="Profile"
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
