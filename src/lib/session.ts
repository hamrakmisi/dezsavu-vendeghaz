import { SessionOptions } from "iron-session";

export interface SessionData {
  user?: {
    id: string;
    userName: string;
  };
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
