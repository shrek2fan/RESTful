const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../src/routes/products');

const app = express();
app.use(bodyParser.json());
app.use('/', productRoutes);

describe('GET /', () => {
  it('should return Hello World!', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});
