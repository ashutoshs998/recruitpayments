require('dotenv/config');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongodb = require('./mongodb')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.post('/subscription/subscriptionWebhook', async (req, res) => {
  if (req.body.event == "subscription.activated") {
    let updateOld = await mongodb.models.subscriptions.updateMany({}, {
      activated: false
    })
    let data = await mongodb.models.subscriptions.updateOne({
      subscriptionId: req.body.payload.subscription.entity.id
    }, {
      activated: true
    })
  }
  res.sendStatus(200)
})

app.listen(process.env.port, () => {
  console.log(`Listening at port: ${process.env.port}`)
})