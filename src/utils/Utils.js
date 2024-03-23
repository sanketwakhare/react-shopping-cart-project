export const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(price ?? "");
  return formattedPrice;
};
