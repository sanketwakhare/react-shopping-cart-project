import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useApi from "hooks/useApi";
import Avatar from "ui-components/Avatar/Avatar";
import UrlConfig from "utils/UrlConfig";

import "./user-profile.scss";

const UserProfile = () => {
  const { request } = useApi();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    avatar: "", // URL of the user's avatar image
    roles: [],
  });

  useEffect(() => {
    if (!isLoggedIn) {
      // navigate to home page if user already logged in
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await request(UrlConfig.USER_PROFILE_URL);
        setUserData((prevValues) => {
          return {
            ...prevValues,
            ...response?.data?.data,
          };
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    // Update the user's name
    setUserData({ ...userData, name: e.target.value });
  };

  const handleImageUpload = (e) => {
    // Handle image upload
    const file = e.target.files[0];
    // Upload the file to the server using FormData
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated user data to the server
      await axios.put("/api/user/profile", userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-inner-container box-shadow">
        <div className="profile-header">Profile</div>
        <div onSubmit={handleSubmit} className="profile-body-grid">
          <div className="profile-left-container">
            <div className="field">
              <label className="field-name">Email</label>
              <div className="field-value">
                <div className="email-container">
                  <span className="email-value">{userData?.email}</span>
                  {userData?.email && (
                    <span className="email-verified-icon">
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="name" className="field-name">
                Name
              </label>
              <input
                className="field-value"
                type="text"
                name="name"
                value={userData?.name}
                onChange={handleNameChange}
                disabled
              />
            </div>
            <div className="field">
              <label htmlFor="name" className="field-name">
                Roles
              </label>
              <label className="field-value" name="roles">
                <span className="user-roles">
                  {userData?.roles && userData?.roles.join(", ")}
                </span>
              </label>
            </div>
          </div>
          <div className="profile-right-container">
            <div className="field">
              <label className="field-name">Mobile</label>
              <input
                className="field-value"
                type="text"
                value={userData?.mobile}
                disabled
              />
            </div>
            <div className="field">
              <label className="field-name">Avatar</label>
              {userData?.avatar && <img src={userData?.avatar} alt="Avatar" />}
              <div className="field-value">
                {userData?.email && (
                  <div className="avatar-container">
                    <Avatar email={userData?.email} />
                    <input
                      type="file"
                      accept="image/*"
                      onClick={handleImageUpload}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-footer">
          <button type="submit" disabled>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
