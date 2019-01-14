var express = require('express');
var app = express();

app.use(express.static('build'));
 
app.get('*', function (req, res) {
  res.sendFile(`${__dirname}/build/index.html`);
})

const port = process.env.PORT || 9000;
 
app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
});