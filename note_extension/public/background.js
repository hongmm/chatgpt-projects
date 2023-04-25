/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/background.tsx ***!
  \****************************/

//require('chrome');
console.log("Background script running.");
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUUxQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUU7SUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGUtdGFraW5nLWNocm9tZS1leHRlbnNpb24vLi9zcmMvYmFja2dyb3VuZC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy9yZXF1aXJlKCdjaHJvbWUnKTtcbmNvbnNvbGUubG9nKFwiQmFja2dyb3VuZCBzY3JpcHQgcnVubmluZy5cIik7XG5cbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgY29uc29sZS5sb2coXCJFeHRlbnNpb24gaW5zdGFsbGVkLlwiKTtcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=