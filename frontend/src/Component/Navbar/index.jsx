import "./index.css";
const Navbar = () => {
  return (
    <nav className="navbar bg-amber-400">
      <img
        className="image_logo"
        src="https://scontent.fbho3-5.fna.fbcdn.net/v/t39.30808-1/348266662_1481664139321064_8379212154246497440_n.png?stp=dst-png_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=mm--qLW7MygQ7kNvwE17iA7&_nc_oc=AdnjSutr7xdbVnDULo4qGfZNb2e9VL0Zo_K9gFpIdrTyQIZyBuqPHb1hIWm-zxcDmHW338FvAkrIjX0qZjPppQKL&_nc_zt=24&_nc_ht=scontent.fbho3-5.fna&_nc_gid=k9fe9Qtq7XRx2uGid5Axkg&oh=00_AfV76hhIC0RhNcjBSRY2tzj_UdF3-bCqA04_hvlc9PZPAw&oe=68B63C4A"
      />
      <div className="flex gap-10 text-lg font-medium  items-center">
        <button>Home</button>
        <button>Services</button>
        <button>Products</button>
        <button>Contact</button>
        <img
          src="https://as1.ftcdn.net/v2/jpg/05/78/83/56/1000_F_578835615_liuR85qKaLik6kXDlOIYbdLFaL5pXbmY.jpg"
          className="rounded-full h-[50px] w-[50px]"
        />
      </div>
    </nav>
  );
};
export default Navbar;
