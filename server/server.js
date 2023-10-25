const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const port = process.env.PORT || 5000; // Use the defined PORT or default to 5000
const mongoURI = process.env.MONGODB_URI;





const app = express();
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

mongoose.connect(`${mongoURI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });



const userControllers = require('./controllers/userControllers');
app.use('/users', userControllers);


const costumerControllers = require('./controllers/costumerControllers');
app.use('/costumer', costumerControllers);




app.listen(port, (err, res) => {
  console.log(`server is Running : http://localhost:${port}`);
});
