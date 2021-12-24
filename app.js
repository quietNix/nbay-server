require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");


const app = express();


var corsOptions = {
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_ORIGIN : "http://localhost:3000",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true // allow session cookie from browser to pass through
}
app.use(cors(corsOptions));

app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({ extended: true }))
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 14 * 24 * 60 * 60 * 1000 //in ms
    },
}));
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(process.env.MONGO_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => { console.log("mongodb connection established") },
    e => console.error(e)
);

app.get("/", (req, res) => {
    res.send("Hi, This is a backend server of nbay, go to https://nbay.quietnix.com");
})

const userRouter = require("./routes/users");
const itemRouter = require("./routes/items");
const purchaseRouter = require("./routes/purchases");
const authRouter = require("./routes/auths");

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/purchases", purchaseRouter);


let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}

app.listen(port, function () {
    console.log("Server started on port: ", port);
});