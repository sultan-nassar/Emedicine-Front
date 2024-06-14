

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utility/constants";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [fetchError, setFetchError] = useState(false); // State to track fetch errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/Users/viewUser?ID=${localStorage.getItem("userID")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.statusCode === 200) {
          setUser(response.data.user);
        } else {
          console.error(
            "Error fetching user data:",
            response.data.statusMessage
          );
          setFetchError(true); // Set fetch error state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFetchError(true); // Set fetch error state
      } finally {
        setLoading(false); // Update loading state once fetching is done
      }
    };

    fetchUser();
  }, []);

  // Handle loading state while fetching data
  if (loading) {
    return (
      <>
        <Header />
        <div className="container mt-4">Loading...</div>
        <Footer />
      </>
    );
  }

  // Handle fetch error state
  if (fetchError) {
    return (
      <>
        <Header />
        <div className="container mt-4">
          Error fetching user data. Please try again later.
        </div>
        <Footer />
      </>
    );
  }

  // Handle redirect if user is not fetched
  if (!user) {
    return <Navigate replace to={"/"} />;
  }

  // Render profile information once data is fetched
  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={user.imageUrl}
              alt={user.imageAlt}
              className="img-thumbnail profile-image"
            />
          </div>
          <div className="col-md-8">
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
