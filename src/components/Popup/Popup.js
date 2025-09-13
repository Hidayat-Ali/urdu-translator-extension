import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Load the saved state from storage
    chrome.storage.local.get(["extensionEnabled"], (result) => {
      if (result.extensionEnabled !== undefined) {
        setIsEnabled(result.extensionEnabled);
      }
    });
  }, []);

  const toggleExtension = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    // Save state to storage
    chrome.storage.local.set({ extensionEnabled: newState });

    // Send message to content script to enable/disable
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleExtension",
        enabled: newState,
      });
    });
  };

  return (
    <div className="popup-container">
      <h3>English to Urdu Translator</h3>
      <div className="toggle-container">
        <span>Extension Status: </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={toggleExtension}
          />
          <span className="slider round"></span>
        </label>
        <span className="status-text">
          {isEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>
      <div className="instructions">
        <p>Hover over any English word to see its Urdu translation.</p>
        <p>Note: Translation may take a moment for the first time.</p>
      </div>
    </div>
  );
};

export default Popup;
