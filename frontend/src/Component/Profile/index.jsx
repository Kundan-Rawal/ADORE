import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Edit, Save } from "lucide-react";

// Reusable component for displaying profile information rows.
const ProfileInfoRow = ({
  icon,
  label,
  value,
  name,
  isEditing,
  onChange,
  readOnly = false, // Default readOnly to false
}) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
      {icon}
      {label}
    </dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {isEditing && !readOnly ? (
        <input
          type={name === "email" ? "email" : "text"}
          name={name}
          value={value || ""} // Ensure value is not undefined
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
        />
      ) : (
        <span>{value || "..."}</span> // Display placeholder if no value
      )}
    </dd>
  </div>
);

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null); // Start with null data
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // For initial data load

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      // FIX: Changed from Cookies.get to localStorage.getItem to match your implementation.
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("No user email found in local storage.");
        setIsFetching(false);
        // Handle not logged in state, e.g., redirect to login
        return;
      }

      try {
        const response = await fetch(
          `https://adore-upde.onrender.com/profile/${userEmail}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Optionally show an error message to the user
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    if (!userData || !userData.email) return;

    setIsLoading(true);
    console.log("Saving data to backend:", {
      name: userData.name,
      phone: userData.phone,
    });

    try {
      const response = await fetch(
        `https://adore-upde.onrender.com/profile/${userData.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userData.name,
            phone: userData.phone,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUserData(updatedUser); // Update state with fresh data from server
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  if (isFetching) {
    return (
      <div className="bg-slate-50 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-slate-50 min-h-screen flex justify-center items-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-600">
            Could Not Load Profile
          </h2>
          <p className="text-gray-600">
            Please make sure you are logged in and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg overflow-hidden sm:rounded-2xl border border-slate-200">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-yellow-50 border-b border-yellow-200">
            <div>
              <h2 className="text-2xl leading-6 font-bold text-cyan-950">
                User Profile
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-cyan-900">
                Your personal details and information.
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-500 transition shadow"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition shadow disabled:bg-green-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 sm:px-0 divide-y divide-gray-200">
                <ProfileInfoRow
                  icon={<User className="text-gray-400" />}
                  label="Full Name"
                  value={userData.name}
                  name="name"
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
                <ProfileInfoRow
                  icon={<Mail className="text-gray-400" />}
                  label="Email address"
                  value={userData.email}
                  name="email"
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  readOnly // Email is the identifier and cannot be edited
                />
                <ProfileInfoRow
                  icon={<Phone className="text-gray-400" />}
                  label="Phone Number"
                  value={userData.phone}
                  name="phone"
                  isEditing={isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
