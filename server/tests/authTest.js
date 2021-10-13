const app = require('../app');
const request = require('supertest');
const expect = require('chai').expect;

describe('Auth API Tests', () => {
  /** Works */
  // it("should create a user", (done) => {
  //   request(app).post("/auth/register")
  //     .type('form')
  //     .send({ "firstName": "Jane", "lastName": "Doe", "email": "jane133@gmail.com", "password": "password" })
  //     .set("Accept", "application/json")
  //     .end((err, res) => {
  //       if (err) done(err);
  //       expect(200);
  //       done();
  //     });
  // });

  it("should not create a user with registered email id", (done) => {
    request(app).post("/auth/register")
      .type('form')
      .send({ "firstName": "Jane", "lastName": "Doe", "email": "jane132@gmail.com", "password": "password" })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(409);
        done();
      });
  });

  it("should not create a user without a missing field", (done) => {
    request(app).post("/auth/register")
      .type('form')
      .send({ "firstName": "Jane", "email": "jane132@gmail.com", "password": "password" })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(400);
        done();
      });
  });

  it("should log in user with correct credentials", (done) => {
    request(app).post("/auth/login")
      .type('form')
      .send({ "email": "jane132@gmail.com", "password": "password" })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(200);
        done();
      });
  });

  it("should not log in user with incorrect credentials", (done) => {
    request(app).post("/auth/login")
      .type('form')
      .send({ "email": "jane132@gmail.com", "password": "password123" })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(404);
        done();
      });
  });

  it("should not login a user without a missing field", (done) => {
    request(app).post("/auth/login")
      .type('form')
      .send({ "firstName": "Jane", "email": "jane132@gmail.com", "password": "password" })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(400);
        done();
      });
  });

});
