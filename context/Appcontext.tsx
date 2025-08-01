/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: "",
  });
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/session');
        const data = await response.json();
        
        if (data.success && data.user) {
          setUser({
            name: data.user.name,
            role: data.user.role,
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};