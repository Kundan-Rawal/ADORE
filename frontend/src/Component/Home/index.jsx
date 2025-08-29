import "./index.css";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import cookies from "js-cookie";

const Home = () => {
  const [services, changeService] = useState([]);
  const [products, changeProducts] = useState([]);
  const [news, changenews] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/services"); // adjust backend port
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
        const response = await fetch("http://localhost:3000/products"); // adjust backend port
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
        const response = await fetch("http://localhost:3000/news"); // adjust backend port
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
    <>
      <div className="bg-yellow-100 w-[100%] h-[80vh] flex  justify-around items-center">
        <div>
          <h1 className="text-7xl text-cyan-950 font-extrabold font-serif">
            Welcome to ADORE!
          </h1>
          <p className="text-3xl text-center font-serif">
            Motivating youth for positive action.
          </p>
        </div>
        <div>
          <img
            src="https://cdn.dribbble.com/userupload/36884877/file/original-c2dd6dea7a84eb1ed27fac0d6d304200.png?resize=1200x900&vertical=center"
            className="h-[500px] w-[500px] rounded-2xl "
          />
        </div>
      </div>
      <div className="bg-white w-[100%] h-[80vh] flex flex-col justify-center items-center gap-5">
        <h1 className="text-7xl text-cyan-950 font-extrabold font-serif">
          Our Services
        </h1>
        <ul className="services-grid">
          {services.map((service) => (
            <li key={service.id} className="service-card">
              <div className="icon-container">
                <img src={service.icon} alt={service.name} />
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
        <button className="bg-amber-400 text-white px-8 py-6 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer">
          Learn More{" "}
        </button>
      </div>
      <div className="bg-yellow-100 w-[100%] h-[80vh] flex  justify-around items-center">
        <div>
          <h1 className="text-7xl text-cyan-950 font-extrabold font-serif">
            Products
          </h1>
          <button className="bg-amber-400 mt-4 text-white px-8 py-6 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer">
            Browse All Products
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-40 object-contain"
              />
              <h2 className="text-xl font-bold mt-4">{item.name}</h2>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <p className="text-gray-600 text-center mt-2 text-sm">
                {item.description}
              </p>
              <p className="text-lg font-semibold text-green-700 mt-3">
                ₹ {item.price}
              </p>
              <button className="mt-4 w-full bg-amber-400 text-white py-2 rounded-xl shadow hover:bg-amber-700 transition duration-300">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white w-[100%] h-[100vh] flex flex-col justify-center items-center gap-5 p-8">
        <h1 className="text-7xl text-cyan-950 font-extrabold font-serif mb-5">
          News Headlines
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-[300px] md:w-[320px] lg:w-[340px] rounded-2xl overflow-hidden shadow-lg bg-white border border-amber-200 hover:shadow-2xl transition duration-300 flex flex-col"
            >
              
              <div className="relative h-48 w-full bg-amber-100 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  {new Date(item.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-amber-600 transition">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">
                  {item.description}
                </p>

                <button className="mt-auto bg-amber-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-amber-600 transition duration-300">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button className="bg-amber-400 mt-4 text-white px-8 py-6 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer">
            View All News
          </button>
        </div>
      </div>
      <div>
        <section className="bg-white py-16 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
            <div>
              <h2 className="text-7xl font-bold font-serif text-cyan-950 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                If you have any questions or want to{" "}
                <span className="font-semibold text-amber-600">
                  get a free estimate
                </span>{" "}
                for your project, contact us via email or phone call. We will be
                very happy to help you!
              </p>

              <ul className="space-y-6 text-gray-800">
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
              <button className="bg-amber-400 mt-4 text-white px-8 py-6 rounded-lg text-lg font-medium hover:bg-amber-500 transition cursor-pointer">
                Get in Touch
              </button>
            </div>

            <div className="relative">
              <div className="bg-amber-500 rounded-2xl h-full flex items-center justify-center ">
                <img
                  src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-0d90-622f-b783-f7cb25469b9a/raw?se=2025-08-28T21%3A02%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=98b6f35a-1369-5f31-8f3d-77aac4657d09&skoid=71e8fa5c-90a9-4c17-827b-14c3005164d6&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-28T19%3A58%3A48Z&ske=2025-08-29T19%3A58%3A48Z&sks=b&skv=2024-08-04&sig=62xM0wZyiIkhaKOF7O1CQG6H80aY1vW3p0KfFsEQZ5w%3D"
                  alt="Customer Support"
                  className="rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-amber-400 text-white py-6 mt-8">
          <div className="max-w-6xl mx-auto text-center">
            &copy; 2024 ADORE. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};
export default Home;
