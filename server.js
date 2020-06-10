const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./common/env.config');

const app = express();
var router = express.Router();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

router.get('/',(req,res) => {
    res.json({"message" : "Hello Welcome.."});
});

app.use(router);

require('./routes/routes')(router);

app.listen(config.Port, (err) => {
    if(err) {
        console.log("Unable to Start the Server!!");
    } else {
        console.log("Server is listening on port : ",config.Port);
    }
});