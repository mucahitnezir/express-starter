import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

import server from '../src/app';

chai.should();
chai.use(chaiHttp);

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'hello@example.com',
  password: '1234',
};

let token;

describe('Authentication tests', () => {
  it('(POST /auth/register) creates new user', (done) => {
    chai.request(server)
      .post('/auth/register')
      .send(testUser)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        // Check response
        res.should.have.status(201);
        res.body.should.have.property('token').a('string');
        done();
      });
  });

  it('(POST /auth/login) test login request', (done) => {
    const payload = { email: testUser.email, password: testUser.password };
    chai.request(server)
      .post('/auth/login')
      .send(payload)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        // Check response
        res.should.have.status(200);
        res.body.should.have.property('token').a('string');
        // Set token
        token = res.body.token;
        done();
      });
  });

  it('(GET /auth/me) get current user', (done) => {
    chai.request(server)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        // Check response
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('firstName').eql(testUser.firstName);
        res.body.should.have.property('lastName').eql(testUser.lastName);
        res.body.should.have.property('email').eql(testUser.email);
        res.body.should.have.property('createdAt');
        res.body.should.have.property('updatedAt');
        done();
      });
  });

  it('(PUT /auth/me) update current user', (done) => {
    const payload = { firstName: 'Express', lastName: 'Starter' };
    chai.request(server)
      .put('/auth/me')
      .send(payload)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        // Check response
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        done();
      });
  });

  it('(DELETE /auth/me) delete current user', (done) => {
    chai.request(server)
      .delete('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        // Check response
        res.should.have.status(204);
        done();
      });
  });
});
