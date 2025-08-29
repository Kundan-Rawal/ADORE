import { useState, useEffect } from "react";
import "./index.css";

const Products = () => {
  const [products, changeProducts] = useState([]);

  useEffect(() => {
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

    fetchProduct();
  }, []);

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className="bg-white w-[100%] h-[80vh] flex flex-col justify-center items-center gap-5">
        <h1 className="text-7xl text-cyan-950 font-extrabold font-serif">
          Our Products
        </h1>
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
    </div>
  );
};
export default Products;
