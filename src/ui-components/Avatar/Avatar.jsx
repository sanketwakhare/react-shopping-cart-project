import gravatar from "gravatar";

const Avatar = ({ email }) => {
  // Generate Gravatar URL based on the email address
  const avatarUrl = gravatar.url(email, { s: "200", d: "identicon", r: "pg" });
  return <img src={avatarUrl} alt="Avatar" />;
};

export default Avatar;
