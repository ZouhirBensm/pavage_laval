function logDataInColoredStructure(data, indent = '') {
  // Helper function to determine the type of a value (string, number, array, object, etc.)
  function getType(value) {
    if (Array.isArray(value)) {
      return `Array of ${getType(value[0])}`; // Get type of the first item in the array
    } else if (value && typeof value === 'object') {
      return 'Object';
    } else {
      return typeof value;
    }
  }

  // Function to color the keys in different colors based on the nesting level
  function colorKey(key, level) {
    const colors = [
      '\x1b[32m', // Green for level 1
      '\x1b[33m', // Yellow for level 2
      '\x1b[34m', // Blue for level 3
      '\x1b[36m', // Cyan for level 4
      '\x1b[35m', // Magenta for level 5
    ];
    // Default color (in case we go deeper than 5 levels)
    const defaultColor = '\x1b[37m'; 

    const color = colors[level] || defaultColor;
    return `${color}"${key}"\x1b[0m`; // Apply color to the key
  }

  // Function to log structures for arrays of objects (only mention the structure once)
  function logArrayStructure(arr, currentIndent, level) {
    if (arr.length > 0 && typeof arr[0] === 'object') {
      console.log(`${currentIndent}${colorKey('Array of Object', level)}`);
      // Only display the structure of the first item in the array
      logStructure(arr[0], currentIndent + '  ', level + 1);
    } else {
      console.log(`${currentIndent}${colorKey('Array of ' + getType(arr[0]), level)}`);
    }
  }

  // Recursive function to log the structure of the data in a tree-like format
  function logStructure(obj, currentIndent = '', level = 0) {
    if (Array.isArray(obj)) {
      // Handle arrays - log the structure of the first object only
      logArrayStructure(obj, currentIndent, level);
    } else if (typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const keyType = getType(obj[key]);
          console.log(`${currentIndent}${colorKey(key, level)}: ${keyType}`);

          // Recursively handle nested objects or arrays
          if (typeof obj[key] === 'object') {
            logStructure(obj[key], currentIndent + '  ', level + 1);
          }
        }
      }
    }
  }

  // Function to log top-level fields and apply spacing
  function logTopLevelStructure(data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const keyType = getType(data[key]);

        // Log the top-level field (with extra spacing)
        console.log(`\n${colorKey(key, 0)}: ${keyType}`);

        // Recursively log nested structures (no extra spacing)
        if (typeof data[key] === 'object') {
          logStructure(data[key], '  ', 1); // Start with level 1 for nested fields
        }
      }
    }
  }

  // Call the function to start from the top-level fields
  logTopLevelStructure(data);
}


module.exports = logDataInColoredStructure