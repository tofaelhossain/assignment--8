const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka", // Set time zone to Bangladesh (Asia/Dhaka)
  });
};
export { formatDate };
