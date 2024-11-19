chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
});

chrome.bookmarks.onCreated.addListener(() => {
  console.log("onCreated...");
});
