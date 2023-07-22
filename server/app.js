
const { response } = require('express');
var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');
const axios = require('axios');
var app = express();
const bodyParser = require('body-parser'); // Import body-parser
var fs = require("fs");
const user = require('./routes/user.js')
require("dotenv").config();
require("./config/database");
const mailContact = require('./routes/mailer.js');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Add body-parser middlewar
const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
  // Enter your api key inside of '';
  apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);



app.post('/responseGPT', async (req, res) => {
  const { content } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: content },
      ],
    });

    const message = completion.data.choices[0].message;
    res.send(message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// ثبت نام کاربر جدید
app.use("/user", user);
app.use("/" , mailContact);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 });