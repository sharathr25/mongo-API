const request = require('supertest');
const { expect } = require('chai');

describe('loading express', () => {
  let server;
  process.env.PORT = 6000;
  process.env.DATABASE = 'test';
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /api/signup', (done) => {
    request(server)
      .post('/api/signup')
      .send({
        username: 'abcd',
        email: 'abcd@gmail.com',
        password: '1234',
        password1: '1234',
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('user added sucessfully');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /api/signup', (done) => {
    request(server)
      .post('/api/signup')
      .send({
        username: 'abcd',
        email: 'abcd@gmail.com',
        password: '1234',
        password1: '1234',
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('user already in db');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /api/login', (done) => {
    request(server)
      .post('/api/login')
      .send({
        email: 'abcd@gmail.com',
        password: '1234',
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"username":"abcd"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login with invalid email', (done) => {
    request(server)
      .post('/api/login')
      .send({
        email: 'a@gmail.com',
        password: '1234',
      })
      .set('Content-Type', 'application/json')
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.have.string('"message":"invalid user"');
        console.log('----------------------------------------------');
        done();
      });
  });
});
