import { useEffect, useState } from "react";
import "./index.css";
const Services = () => {
  const [services, changeService] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://adore-upde.onrender.com/"); // adjust backend port
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

    fetchServices();
  }, []);

  return (
    <div className="w-[100%] h-[80vh] flex justify-center items-center">
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
      </div>
    </div>
  );
};
export default Services;
