import express  from "express";
import dotenv  from "dotenv";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import menuRoute from "./routes/menuRoute.js";
import categoryRoute from "./routes/categoryRoute.js"


dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 3000;
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
};
app.use(cookieParser());
app.use(express.json());
app.use(cors());



app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/menu', menuRoute);
app.use('/category', categoryRoute);



app.get("/", (req, res) =>
   res.send("server is on :)")
)



app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
  ); 
