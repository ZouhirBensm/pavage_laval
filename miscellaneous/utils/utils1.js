const json = require('../db/json')

// Input
// https://developer.mozilla.org/en-US/docs/Web/JavaScript
function parseURL(url){
  const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
  
  if (!parsedURL) {
    return false
  }
  
  return parsedURL
  // Output
  // [all, protocol, fullhost, fullpath]
}


// Input
// /en-US/docs/Web/JavaScript
function parsePath (path) {
  // console.log(path)
  const reg = /[^\/]+/g; 

  const parsedPath = path.match(reg)

  if (!parsedPath) {
    return false
  }
  
  return parsedPath
  // Output
  // ["en-US", "docs", "Web", "JavaScript"]
}

// Function to get the JSON data (replace this with your actual data source)
function getJsonData(title, category) {
  
  title =  title.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  category =  category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())


  console.log(title)
  const matchingObject = getJsonObjectByTitle(title);
  
  if (!matchingObject) {
    content = ''
  }

  // Example JSON data
  return {
    title: title,
    category: category,
    htmlContent: matchingObject.htmlContent,
    datePublished: matchingObject.datePublished,
    dateModified: matchingObject.dateModified
  };
}


// Function to get the JSON data (replace this with your actual data source)
function getJsonData2(title) {
  
  title =  title.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())


  console.log(title)

  const matchingObject = getJsonObjectByTitle(title);
  
  if (!matchingObject) {
    content = ''
  }

  // Example JSON data
  return {
    title: title,
    htmlContent: matchingObject.htmlContent
  };
}


// Function to get the JSON object by title
function getJsonObjectByTitle(title) {
  // Iterate over the JSON data to find the object with the matching title
  for (let key in json) {
    if (json[key].title === title) {
      return json[key];
    }
  }
  return null; // Return null if no matching title is found
}



const utils1 = {
  parseURL,
  parsePath,
  getJsonData,
  getJsonData2
}

module.exports = utils1