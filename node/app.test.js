const request = require("supertest");
require("jest-sorted");
const app = require("./app");

describe("/spendings", () => {
  test("GET spendings -> 200 - list of spendings", (done) => {
    request(app)
      .get("/spendings")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              description: expect.any(String),
              amount: expect.any(Number),
              spent_at: expect.any(String),
              currency: expect.any(String),
            }),
          ])
        );
        done();
      });
  });

  test("GET spendings -> 200 - filtered list of spendings by currency", (done) => {
    request(app)
      .get("/spendings?currency=HUF")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              description: expect.any(String),
              amount: expect.any(Number),
              spent_at: expect.any(String),
              currency: "HUF",
            }),
            expect.not.objectContaining({
              currency: "USD",
            }),
          ])
        );
        done();
      });
  });

  test("GET spendings -> 200 - sort by amount", (done) => {
    request(app)
      .get("/spendings?orderBy=amount&orderDirection=desc")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              description: expect.any(String),
              amount: expect.any(Number),
              spent_at: expect.any(String),
              currency: expect.any(String),
            }),
          ]),
          expect(response.body).toBeSorted({ key: "amount", descending: true })
        );
        done();
      });
  });

  test("POST spending -> 201 - creates spending elem", (done) => {
    request(app)
      .post("/spendings")
      .send({
        description: "Coffee",
        amount: 1500,
        currency: "HUF",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            description: "Coffee",
            amount: 1500,
            spent_at: expect.any(String),
            currency: "HUF",
          })
        );
        done();
      });
  });

  test("POST spending -> 500 - negative amount", (done) => {
    request(app)
      .post("/spendings")
      .send({
        description: "Coffee",
        amount: -1500,
        currency: "HUF",
      })
      .expect(500, done);
  });

  test("POST spending -> 201 - amount with preceeding 0", (done) => {
    request(app)
      .post("/spendings")
      .send({
        description: "Coffee",
        amount: "001500",
        currency: "HUF",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            description: "Coffee",
            amount: 1500,
            spent_at: expect.any(String),
            currency: "HUF",
          })
        );
        done();
      });
  });

  test("POST spending -> 500 - invalid currency", (done) => {
    request(app)
      .post("/spendings")
      .send({
        description: "Coffee",
        amount: 1500,
        currency: "INVALID",
      })
      .expect(500, done);
  });
});
