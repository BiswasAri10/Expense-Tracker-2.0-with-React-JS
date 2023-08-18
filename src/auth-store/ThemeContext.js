import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    const storedDarkTheme = localStorage.getItem("darkTheme");
    return storedDarkTheme === "true";
  });

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("darkTheme", newTheme.toString());

      if (!newTheme) {
        localStorage.removeItem("darkTheme");
      }

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
