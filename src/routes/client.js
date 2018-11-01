const express = require('express');
const graphReq = require('graphql-request');
const app = express.Router();
const { port, graphPath } = require('../config/system-config')

app.get('/', (req, res) => {
    res.send('Hello!')
})
app.get('/client', async (req, res) => {
    const { id } = req.params;
    const endpoint = `http://localhost:${port}/${graphPath}`;
    const query = `
    {
        Apps {
            appid
            username
            applines {
              applineid
              appid
              username
            }
          }
    }
    `;
    let data = await graphReq.request(endpoint, query);
    res.send(data);
})

app.get('/client/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(req.protocol + "://" + req.hostname + ":" + port + "/graphql")
    const endpoint = `${req.protocol}://${req.hostname}:${port}/${graphPath}`;
    const query = `
    {
        App(appid: ${id}) {
            appid
            username
            applines {
              applineid
              appid
              username
            }
          }
    }
    `;
    let data = await graphReq.request(endpoint, query);
    res.send(data);
})
module.exports = app;