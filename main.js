const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000

const request = require('request');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const apikey = process.env.TRANSPORT_API_KEY;
const url1 = 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/sydneytrains';
const url2 = 'https://api.transport.nsw.gov.au/v1/gtfs/schedule/nswtrains';

app.use(express.static('public'))

app.get('/data', (req, res) => {
  request({
    url: url1,
    headers: { 'authorization':`apikey ${apikey}` },
    method: 'GET',
    encoding: null
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      res.send(feed);
    }
  });
})

app.get('/apikey', (req, res) => {
  res.send(process.env.MAPS_API_KEY)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))