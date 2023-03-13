const experss = require("express");
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const cors = require("cors");
const bodyParser = require('body-parser')
const filUpload = require('express-fileupload')

const cookieParser = require("cookie-parser");


const errorMiddleware = require("./middlewares/errorMiddleware");

const app = experss();
app.use(experss.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(filUpload())




app.use(cors("origin", "*"));




// Routes
app.use("/", products);
app.use("/", auth);



// Middle wares
app.use(errorMiddleware);

module.exports = app;
