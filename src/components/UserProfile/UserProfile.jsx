import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useApi from "hooks/useApi";
import useToggle from "hooks/useToggle";
import { storeAuthAction } from "store/auth";
import Avatar from "ui-components/Avatar/Avatar";
import UrlConfig from "utils/UrlConfig";

import "./user-profile.scss";

const UserProfile = () => {
  const { request } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;
  const [isEditing, toggleEditProfile] = useToggle(false);
  const [userUpdating, toggleUserUpdating] = useToggle(false);
  const [userSaved, toggleUserSaved] = useToggle(false);
  const [loadingError, setLoadingError] = useState(null);
  const [userClone, setUserClone] = useState(null);

  const inputNameRef = useRef(null);

  const [userData, setUserData] = useState({
    userId: "",
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
    if (userSaved) {
      setTimeout(() => {
        toggleUserSaved(false);
      }, 5000);
    }
  }, [userSaved]);

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
    setUserData({ ...userData, name: e.target.value });
  };

  const handleMobileChange = (e) => {
    setUserData({ ...userData, mobile: e.target.value });
  };

  const handleImageUpload = (e) => {
    // Handle image upload
    const file = e.target.files[0];
    // Upload the file to the server using FormData
  };

  const handleOnEditOrSave = async () => {
    toggleUserSaved(false);
    if (isEditing) {
      toggleUserUpdating(true);
      setLoadingError(null);
      // save the user's mobile and name if present
      const payload = {
        mobile: userData?.mobile,
        name: userData?.name,
      };
      const response = await request(UrlConfig.UPDATE_USER_PROFILE_URL, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      if (response.loadError) {
        if (response.data?.errors) {
          setLoadingError(response.data.errors[0]);
        } else {
          setLoadingError(response.loadError);
        }
      } else if (response.data) {
        toggleUserSaved(true);
        toggleEditProfile();
        dispatch(
          storeAuthAction({
            user: { mobile: userData.mobile, name: userData.name },
          })
        );
      }
      toggleUserUpdating(false);
    } else {
      inputNameRef.current.focus({ focusVisible: true, preventScroll: false });
      inputNameRef.current.select();
      const clone = Object.assign({}, userData);
      setUserClone(clone);
      toggleEditProfile();
    }
  };

  const handleOnCancelEdit = () => {
    toggleEditProfile();
    setLoadingError(null);
    setUserData((prevValues) => {
      return {
        ...prevValues,
        ...userClone,
      };
    });
  };

  const saveLabel = userUpdating ? "Saving..." : "Save";

  return (
    <div className="profile-container">
      <div className="profile-inner-container box-shadow">
        <div className="profile-header">Profile</div>
        <div className="profile-body-grid">
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
                disabled={!isEditing}
                ref={inputNameRef}
                autoFocus
              />
              {loadingError && loadingError?.path === "name" && (
                <div className="error-note">{loadingError?.msg}</div>
              )}
            </div>
            <div className="field">
              <label htmlFor="roles" className="field-name">
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
              <label htmlFor="mobile" className="field-name">
                Mobile
              </label>
              <input
                className="field-value"
                type="text"
                name="mobile"
                value={userData?.mobile}
                onChange={handleMobileChange}
                disabled={!isEditing}
                autoFocus
              />
              {loadingError && loadingError?.path === "mobile" && (
                <div className="error-note">{loadingError?.msg}</div>
              )}
            </div>
            <div className="field">
              <label className="field-name">Avatar</label>
              {userData?.avatar && <img src={userData?.avatar} alt="Avatar" />}
              <div className="field-value">
                {userData?.email && (
                  <div className="avatar-container">
                    <Avatar email={userData?.email} />
                    {/* <input
                      type="file"
                      accept="image/*"
                      onClick={handleImageUpload}
                      disabled
                    /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-footer">
          <button type="button" onClick={handleOnEditOrSave}>
            {!isEditing ? "Edit" : saveLabel}
          </button>
          {isEditing && (
            <button
              type="button"
              className="button-dark"
              onClick={handleOnCancelEdit}
            >
              Cancel
            </button>
          )}
          {userSaved && <div className="save-note">User Saved</div>}
          {loadingError && loadingError?.type !== "field" && (
            <div className="error-note">{loadingError?.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
