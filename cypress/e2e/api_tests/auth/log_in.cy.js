const { expect } = require("chai");
const { request } = require("http");

let tokenvalue

describe('hiq api test', () => {
  it('signin request execution', () => {
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
})