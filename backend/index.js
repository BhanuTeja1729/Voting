const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const connectToMongo = require("./database/db");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Available routes
app.use("/voter", require("./routes/voter"));
app.use("/admin", require("./routes/admin"));

app.listen(port, () => {
  console.log(`Voting App listening at port http://localhost:${port}`);
});
