import React, { useState, useEffect } from "react";
import { useTheme } from "../auth-store/ThemeContext";

const PremiumActivation = ({ onDownloadCSV, onToggleTheme }) => {
  const [premiumActivated, setPremiumActivated] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const storedPremiumActivated = localStorage.getItem("premiumActivated");
    setPremiumActivated(storedPremiumActivated === "true");
  }, []);

  const handleActivatePremium = () => {
    localStorage.setItem("premiumActivated", "true");
    setPremiumActivated(true);
  };

  const handleDeactivatePremium = () => {
    localStorage.removeItem("premiumActivated");
    if (premiumActivated) {
      if (localStorage.getItem("darkTheme") === "true") {
        localStorage.removeItem("darkTheme");
        toggleTheme(); 
      }
    }
    setPremiumActivated(false);
  };
  
  

  return (
    <div>
      {!premiumActivated ? (
        <button onClick={handleActivatePremium} className="premium-button">
          Activate Premium
        </button>
      ) : (
        <div>
          <button onClick={handleDeactivatePremium} className="premium-button">
            Deactivate Premium
          </button>
          <button onClick={onDownloadCSV} className="download-button">
            Download File
          </button>
          <button onClick={onToggleTheme} className="theme-toggle-button">
            Toggle Theme
          </button>
        </div>
      )}
    </div>
  );
};

export default PremiumActivation;
