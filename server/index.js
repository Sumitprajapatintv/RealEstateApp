import express from "express";
import mongoose from "mongoose";
import authRouter from "./route/auth.route.js";
import cookieParser from 'cookie-parser';
import userRouter from './route/user.route.js';
import listingRouter from './route/listingRoute.js';
import path from 'path';

mongoose
  .connect(
    "mongodb+srv://prajapatisumit013:yVRTP9tnb0dOJyJ2@cluster0.a7otg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  const __dirname = path.resolve();
const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log(`Server is Listing on PORT 3000`);
});
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
