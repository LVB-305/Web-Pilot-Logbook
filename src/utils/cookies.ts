import Cookies from "js-cookie";
import { FlightLog, columns } from "@/schemas/flight";

const SORT_LATEST_COOKIE = "sort-latest";

export const getSortLatestCookie = (): boolean => {
  const cookie = Cookies.get(SORT_LATEST_COOKIE);
  return cookie ? JSON.parse(cookie) : true; // default to true
};

export const setSortLatestCookie = (sortLatest: boolean) => {
  Cookies.set(SORT_LATEST_COOKIE, JSON.stringify(sortLatest), { expires: 365 });
};

const VISIBLE_COLUMNS_COOKIE = "visible-columns";

export const getDefaultVisibleColumns = (): (keyof FlightLog)[] => {
  return columns
    .filter((col) => !col.hiddenByDefault)
    .map((col) => col.key as keyof FlightLog);
};

export const getVisibleColumnsCookie = (): (keyof FlightLog)[] | undefined => {
  const cookie = Cookies.get(VISIBLE_COLUMNS_COOKIE);
  return cookie ? JSON.parse(cookie) : undefined;
};

export const setVisibleColumnsCookie = (columns: (keyof FlightLog)[]) => {
  Cookies.set(VISIBLE_COLUMNS_COOKIE, JSON.stringify(columns), {
    expires: 365,
  });
};
