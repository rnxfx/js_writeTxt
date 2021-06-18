const fs = require('fs');
var writeMode = fs.writeFile;
var fileList = "";

function processAndWriteFiles() {
  let fileArr = fs.readdirSync(".");
  let i = 0;
  
  while(i < fileArr.length) {
    fileList += fileArr[i] + "\n";
    i++;
  }

  writeMode('list.txt', fileList, (error) => {
    if (error) throw error;
    process.exit(0);
  })
}
  
function question() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
 
  readline.question('The archive already exists, would you like to add to it? :', response => {
    switch(response.trim()) {
      case "y": writeMode = fs.appendFile; processAndWriteFiles();
      break;
        readline.close();
      case "n": processAndWriteFiles();
      break;
        process.exit(0);
      default:
        question();
    }
  });
};

function main() {
  if (!fs.existsSync("./list.txt")) {
    processAndWriteFiles();
    return;
  }
  question();
}

main()