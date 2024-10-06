require("dotenv").config();
const http = require("http");
const app = require("./app");
// create server

const PORT = process.env.PORT || 8000;

// Database connection for the server // TODO
const main = async () => {
    app.listen(PORT, () => {
      console.log(`Server is listing on PORT ${PORT}`);
    })
};
main();