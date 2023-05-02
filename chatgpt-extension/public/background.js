chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
chrome.storage.local.set({ 'apiKey': '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' }, function () {
    console.log('API key saved');
});

