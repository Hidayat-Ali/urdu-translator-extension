// Background script for handling extension events
chrome.runtime.onInstalled.addListener(() => {
  console.log("English to Urdu Translator installed");
  // Set default state to enabled
  chrome.storage.local.set({ extensionEnabled: true });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTranslation") {
    // Handle translation requests if needed
    sendResponse({ status: "received" });
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Toggle extension state when icon is clicked
  chrome.storage.local.get(["extensionEnabled"], (result) => {
    const newState = !result.extensionEnabled;
    chrome.storage.local.set({ extensionEnabled: newState });

    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: "toggleExtension",
      enabled: newState,
    });
  });
});
