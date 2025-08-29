import "./index.css";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const [services, changeService] = useState([]);
  const [products, changeProducts] = useState([]);
  const [news, changenews] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://adore-upde.onrender.com//services"); // adjust backend port
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        changeService(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await fetch("https://adore-upde.onrender.com//products"); // adjust backend port
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        changeProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchnews = async () => {
      try {
        const response = await fetch("https://adore-upde.onrender.com//news"); // adjust backend port
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        changenews(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchServices();
    fetchProduct();
    fetchnews();
  }, []);

  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="bg-yellow-50">
        <div className="max-w-7xl min-h-[80vh] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-7xl text-cyan-950 font-extrabold font-serif">
              Welcome to ADORE!
            </h1>
            <p className="mt-4 text-xl md:text-2xl lg:text-3xl text-cyan-900 font-serif">
              Motivating youth for positive action.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://cdn.dribbble.com/userupload/36884877/file/original-c2dd6dea7a84eb1ed27fac0d6d304200.png?resize=1200x900&vertical=center"
              alt="Youth engagement illustration"
              className="rounded-2xl shadow-xl  max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-cyan-950 font-extrabold font-serif">
            Our Services
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-8 bg-slate-50 rounded-2xl shadow-md border border-slate-200"
              >
                <div className="flex justify-center items-center h-20 w-20 bg-amber-100 rounded-full mx-auto">
                  <img
                    src={service.icon}
                    alt={`${service.name} icon`}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold text-cyan-950">
                  {service.name}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <Link to="/services">
            <button className="mt-12 bg-amber-400 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer shadow-lg">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-cyan-950 font-extrabold font-serif">
              Our Products
            </h2>
            <p className="mt-4 text-lg text-cyan-900">
              Explore items that inspire and support your journey.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-30 w-30 object-contain"
                />
                <h3 className="text-xl font-bold mt-3 text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <p className="text-gray-600 mt-2 text-sm flex-grow">
                  {item.description}
                </p>
                <p className="text-xl font-semibold text-green-700 mt-4">
                  ₹ {item.price}
                </p>
                <button className="mt-4 w-[80%] bg-amber-400 text-white py-2 rounded-xl shadow hover:bg-amber-500 transition duration-300">
                  Add to cart
                </button>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products">
              <button className="mt-12 bg-amber-400 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer shadow-lg">
                Browse All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-cyan-950 font-extrabold font-serif">
              News Headlines
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Stay updated with our latest activities and achievements.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-56 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    {new Date(item.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-amber-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <button className="mt-auto self-start bg-amber-500 text-white font-medium py-2 px-5 rounded-lg hover:bg-amber-600 transition duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="mt-12 bg-amber-400 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer shadow-lg">
              View All News
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-cyan-950 mb-6">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              If you have any questions or want to{" "}
              <span className="font-semibold text-amber-600">
                get a free estimate
              </span>{" "}
              for your project, contact us via email or phone call. We will be
              very happy to help you!
            </p>
            <ul className="space-y-5 text-gray-800">
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-amber-600" />
                <span className="text-lg">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-amber-600" />
                <span className="text-lg">contact@yourcompany.com</span>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-amber-600" />
                <span className="text-lg">
                  123 Amber Street, Bhopal, MP 462001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-amber-600" />
                <span className="text-lg">
                  Monday – Friday: 9:00 am – 6:00 pm
                </span>
              </li>
            </ul>
            <Link to="/contact">
              <button className="mt-12 bg-amber-400 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer shadow-lg">
                Contact Us
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dsswbc0tx/image/upload/v1756474076/86c7ad3b-9e04-433c-9849-5b04c1c0f757_oelf2o.png"
              alt="Customer Support"
              className="rounded-2xl shadow-xl max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-400 text-white py-6">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} ADORE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
export default Home;
