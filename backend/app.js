const experss = require("express");
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = experss();
app.use(experss.json());
app.use(cookieParser());

app.use(cors("origin", "*"));




// Routes
app.use("/", products);
app.use("/", auth);



// Middle wares
app.use(errorMiddleware);

module.exports = app;
