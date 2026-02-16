const fs = require('fs');

fs.readFile('app.jsx', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);  
});
