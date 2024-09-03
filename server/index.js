import express from "express";
import mongoose from "mongoose";

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

const app = express();

app.listen(3000, () => {
  console.log(`Server is Listing on PORT 3000`);
});
