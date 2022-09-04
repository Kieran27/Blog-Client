import { format, parseISO } from "date-fns";

export const readTime = (content) => {
  const wpm = 225;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};

export const formatDate = (timestamp) => {
  if (!timestamp) return format(parseISO(Date.now()), "PPpp");
  const formattedDate = format(parseISO(timestamp), "PPpp");
  return formattedDate;
};
