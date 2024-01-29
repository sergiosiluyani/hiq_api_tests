const { expect } = require("chai");
const { request } = require("http");

let tokenvalue
let email
let password

describe('hiq api test', () => {
  it('sigin request execution', () => {
    
    const requestBody={
      email: "serge.siluyanov@gmail.com",
      password: "PasswordPass1992@!"
    };
    cy.request({
      method: 'POST',
      url: 'http://54.193.113.143:4000/auth/signin',
      body: requestBody
    }).then(response => {
      tokenvalue = response.body.accessToken;
      email = requestBody.email
      password = requestBody.password
    }); 
})
})