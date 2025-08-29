import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import Services from "./Component/Services";
import ProtectedRoute from "./Component/ProtectedRoute";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Products from "./Component/Products";
import Contact from "./Component/Contact";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/services" element={<Services />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
