import dayjs from "dayjs";

export const formatPrice = (price, options) => {
  const locale = options?.locale ?? "en-IN";
  const showCurrency = options?.showCurrency ?? false;
  const currency = options?.currency ?? "INR";
  const numberFormatOptions = showCurrency
    ? { currency: currency, style: "currency" }
    : { currency: currency };

  const formattedPrice = new Intl.NumberFormat(
    locale,
    numberFormatOptions
  ).format(price ?? "");
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

export const formatDate = (dateString, format) => {
  const defaultDateFormat = "YYYY-MM-DD h:mm A";
  const dateFormat = format ?? defaultDateFormat;
  const formattedDate = dayjs(dateString).format(dateFormat);
  return formattedDate;
};
