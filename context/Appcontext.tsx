/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
// import { getUser } from "@/actions/user";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: "",
    id: "",
  });
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/session");
        const data = await response.json();

        if (data.success && data.user) {
          setUser({
            name: data.user.name,
            role: data.user.role,
            id: data.user.id,
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);



  return (
    <AppContext.Provider value={{ user, setUser}}>
      {children}
    </AppContext.Provider>
  );
};
