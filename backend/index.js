const express = require('express');
const session = require('express-session');

const port = 3000;
var path = require('path');
const app = express();


app.engine('html', require('ejs').renderfile); 
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.json(__dirname, '/views'));

app.listen(port,()=>{
    console.log('servidor');
})
