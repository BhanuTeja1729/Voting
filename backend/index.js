const connectToMongo = require("./database/db");
const express = require("express");
const cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Available routes
// app.use("/voter", require("./routes/voter"));
app.use("/voter", require("./routes/voter"));
app.use("/admin", require("./routes/admin"));

app.listen(port, () => {
  console.log(`Notebook app listening at port http://localhost:${port}`);
});
