export const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(price ?? "");
  return formattedPrice;
};

export const parseJSONStringRecursively = (object) => {
  return JSON.parse(object, (key, value) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return value;
  });
};
