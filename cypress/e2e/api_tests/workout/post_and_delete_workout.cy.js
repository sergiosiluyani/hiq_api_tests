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
it('get workouts data', () => { 
  // create new workoutId
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
      
      // get created workoutId
  cy.request({
      headers: {
      Authorization: 'Bearer '+tokenvalue,
      accept: 'application/json'
    },
    method: 'GET',
    url: 'http://54.193.113.143:4000/workouts'
  }).then(response => {
    expect(response.status).to.eq(200)
    cy.writeFile('cypress/fixtures/workout_data.json', JSON.stringify({id: response.body[0].id}))
  });
  
  // delete created workoutId
    cy.fixture('workout_data').then(workout => {
      cy.request({
        headers: {
        Authorization: 'Bearer '+tokenvalue,
        accept: 'application/json'
      },
      method: 'DELETE',
      url: 'http://54.193.113.143:4000/workouts/'+workout.id
    }).then(response => {
      expect(response.status).to.eq(204)
    })
  })
})
})