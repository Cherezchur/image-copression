var fs = require('fs');
var readline = require('readline');
const  fetch  =  ( ... args )  =>  import ( 'node-fetch' ) . then ( ( { default : fetch } )  =>  fetch ( ... args ) ) ;

var filename = 'imageUrls.txt';

function downloadFile(url, path) {
  return fetch(url).then(res => {
    res.body.pipe(fs.createWriteStream(path));
  });
}

readline.createInterface({
  input: fs.createReadStream(filename),
  terminal: false
}).on('line', function(line) {
  const fileName = line.split("/").pop()
  downloadFile(line,'images/' + fileName )
   .then(()=>console.log('OK'))
   .catch(err=>console.error(err));
  console.log('Line: ' + line);
});
