var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
var app = express()

app.use(cors())

require('dotenv/config')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const url = process.env.CONNECTION_URL

var User = require('./Models/user')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected");
})

app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/saveUser', async (req, res) => {
    console.log(req.body);
    var user = new User(req.body)
    user.save().then(res => {
        // console.log("user", res);
        res.json({"mes":"success"})
    })
})

app.post('/sendMes', async (req, res) => {
    client.messages
        .create({
            body: req.body.mes,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+919580162152'
        })
        .then(message => console.log(message))
        .done();
})

app.listen(process.env.PORT || 4000, () => {
    console.log("Listening");
})
