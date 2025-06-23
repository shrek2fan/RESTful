const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('should respond with Hello World!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});

