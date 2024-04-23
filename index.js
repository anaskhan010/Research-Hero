// libs
const express = require('express');
const dotenv = require('dotenv');
// const cors = require('cors');





// config
dotenv.config({ path: './config/Config.env' });
const app = express();



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
});
