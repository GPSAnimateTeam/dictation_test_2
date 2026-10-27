function sendScormData(dataObject) {
  console.log("resultData", dataObject);

  if (typeof Api !== "undefined" && Api.postMessage) {
    Api.postMessage(JSON.stringify(dataObject));
    console.error("API found");
  } else {
    console.error("API not available");
  }
}
