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

const utils1 = {
  parseURL,
  parsePath
}

module.exports = utils1