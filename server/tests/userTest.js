const app = require('../app');
const request = require('supertest');
const expect = require('chai').expect;

describe('User API Tests', () => {
  it('should get user with uid 3', (done) => {
    request(app).get('/user?uid=3')
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.first_name).to.equal('Jane');
        done();
      });
  });


  it("should return not found for a non existent user", (done) => {
    request(app).get("/user?uid=0")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(404);
        done();
      });
  });

  /** Works */
  // it("should delete specified user", (done) => {
  //   request(app).del("/user/2")
  //     .set("Accept", "application/json")
  //     .end((err, res) => {
  //       if (err) done(err);
  //       expect(200);
  //       done();
  //     });
  // });

  it("should not delete specified user that does not exist", (done) => {
    request(app).del("/user/0")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(404);
        done();
      });
  });
  // it("should create a user", (done) => {
  //   request(app).post("/users")
  //     .type('form')
  //     .send({ name: 'Jane Doe', username: 'jane123', email: 'jane@email.com', password: 'password' })
  //     .set("Accept", "application/json")
  //     .end((err, res) => {
  //       if (err) done(err);
  //       expect(201);
  //       done();
  //     });
  // });

  // it("should not create a user without email or username", (done) => {
  //   request(app).post("/users")
  //     .type('form')
  //     .send({ name: 'Jane Doe', username: 'jane123', password: 'password' })
  //     .set("Accept", "application/json")
  //     .end((err, res) => {
  //       if (err) done(err);
  //       expect(404);
  //       done();
  //     });
  // });

  it("should update user's email id", (done) => {
    request(app).put("/user")
      .type('form')
      .send({ "uid": 3, "firstName": "Jane", "lastName": "Doe", "email": "jane12@gmail.com", "profilePic": "", "bio": "" })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(200);
        done();
      });
  });

  it("should subscribe to user", (done) => {
    request(app).post("/user/subscribe")
      .type('form')
      .send({ "uid": 3, "conid": 15 })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(200);
        done();
      });
  });

  it("should unsubscribe to user", (done) => {
    request(app).del("/user/unsubscribe")
      .type('form')
      .send({ "uid": 3, "conid": 15 })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(200);
        done();
      });
  });

  it("should not subscribe to same user", (done) => {
    request(app).post("/user/subscribe")
      .type('form')
      .send({ "uid": 3, "conid": 3 })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(409);
        done();
      });
  });

  it("should not subscribe to non-existent user", (done) => {
    request(app).post("/user/subscribe")
      .type('form')
      .send({ "uid": 3, "conid": 0 })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(404);
        done();
      });
  });
});
