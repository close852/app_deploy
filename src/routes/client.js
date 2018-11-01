const express = require('express');
const graphReq = require('graphql-request');
const app = express.Router();
app.get('/', (req, res) => {
    res.send('Hello!')
})
app.get('/client', async (req, res) => {
    const { id } = req.params;
    const endpoint = 'http://localhost:3000/graphql';
    const query = `
    {
        Writers{
          id
          name
          posts {
            id title contents
          }
        }
    }
    `;
    let data = await graphReq.request(endpoint, query);
    res.send(data);
})

app.get('/client/:id', async (req, res) => {
    const { id } = req.params;
    const port = 3000;
    const graphql = 'graphql';
    // console.log(req.protocol + "://" + req.hostname + ":" + port + "/graphql")
    const endpoint = `${req.protocol}://${req.hostname}:${port}/${graphql}`;
    const query = `
    {
        Writer(id: ${id}) {
          id
          name
          posts {
            id title contents
          }
        }
    }
    `;
    let data = await graphReq.request(endpoint, query);
    res.send(data);
})
module.exports = app;