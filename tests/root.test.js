const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../src/routes/products');
const authRoutes = require('../src/routes/auth');
process.env.JWT_SECRET = 'testsecret';

const app = express();
app.use(bodyParser.json());
app.use('/', productRoutes);
app.use('/', authRoutes);

describe('GET /', () => {
  it('should return Hello World!', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});

describe('POST /auth/login', () => {
  it('should return a JWT token for any credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'user', password: 'pass' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
