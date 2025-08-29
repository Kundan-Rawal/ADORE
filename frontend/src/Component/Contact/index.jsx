import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

// Reusable Contact Info Item Component
const ContactInfoItem = ({ icon, text }) => (
  <li className="flex items-start gap-4">
    <div className="flex-shrink-0 text-amber-500 mt-1">{icon}</div>
    <span className="text-gray-700">{text}</span>
  </li>
);

const ContactPage = () => {
  // state to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        alert(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white font-sans antialiased">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-serif font-extrabold tracking-tight text-cyan-950 sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Have a question or want to work together? We’d love to hear from
            you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Form */}
          <div className="bg-slate-50 p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-amber-500 mb-1">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below to send us a message.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-1.5 w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="mt-1.5 w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-800"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="mt-1.5 w-full bg-white text-gray-900 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-amber-500 transition-colors duration-300 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Column: Info & Image */}
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions or want to{" "}
                <span className="font-semibold text-amber-600">
                  get a free estimate
                </span>{" "}
                for your project, contact us via email or phone call. We will be
                very happy to help you!
              </p>
              <ul className="mt-8 space-y-6">
                <ContactInfoItem icon={<Phone />} text="+91 98765 43210" />
                <ContactInfoItem
                  icon={<Mail />}
                  text="contact@yourcompany.com"
                />
                <ContactInfoItem
                  icon={<MapPin />}
                  text="123 Amber Street, Bhopal, MP 462001"
                />
                <ContactInfoItem
                  icon={<Clock />}
                  text="Monday – Friday: 9:00 am – 6:00 pm"
                />
              </ul>
            </div>
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://res.cloudinary.com/dsswbc0tx/image/upload/v1756474076/86c7ad3b-9e04-433c-9849-5b04c1c0f757_oelf2o.png"
                alt="A woman on the phone in a professional setting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-amber-400 text-white py-6">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} ADORE. All rights reserved.
        </div>
      </footer>
    </section>
  );
};

export default ContactPage;
