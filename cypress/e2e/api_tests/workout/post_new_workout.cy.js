const { request } = require("http");

let tokenvalue

describe('hiq api test', () => {
beforeEach(() => {
  cy.fixture('user_data').then(loginFixture => {
    cy.request({
      method: 'POST',
      url: 'http://54.193.113.143:4000/auth/signin',
      body: loginFixture
    }).then(response => {
      tokenvalue = response.body.data['accessToken'];
    });
})
})

it('posts workouts data', () => {
  cy.fixture('data').then(workoutData => {
    cy.request({
      headers: {
      Authorization: 'Bearer '+tokenvalue,
      accept: 'application/json'
    },
    method: 'POST',
    url: 'http://54.193.113.143:4000/workouts',
    body: workoutData
  })
      }).then(response => {
        expect(response.status).to.eq(201)
      }); 
})
})