import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

// Initialize plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Format date to "YYYY-MM-DD"
export const formatDate = (date: string | Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

// Format date to "YYYY-MM-DD HH:mm:ss"
export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

// Format to relative time (e.g., "2 hours ago", "3 days ago")
export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

// Format to localized format (e.g., "Mar 25, 2025")
export const formatLocalizedDate = (date: string | Date): string => {
  return dayjs(date).format("LL");
};

// Format to custom format
export const formatCustom = (date: string | Date, format: string): string => {
  return dayjs(date).format(format);
};
