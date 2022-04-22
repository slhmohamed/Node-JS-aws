//Définition des modules
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Expose-Headers": true,
        "Access-Control-Allow-Headers": true,
    })
);
app.use(express.json())
app.use(bodyParser.json());
 
const calculRouter=require('./routes/calcul-routes');
app.use('/api/calcul',calculRouter.routes);
 const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`app started on port ${PORT}`));  