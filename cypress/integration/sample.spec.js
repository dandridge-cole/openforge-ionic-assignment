/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('OpenForgeProject', ()=>{
 // randomly generate parameters for each test run, eg:
 //    const email = chance.email();
 //     const pass = 'ValidPassword23';s

    beforeEach(() => {
        cy.visit('http://localhost:8100');
    })

    it('has a title', ()=> {
        // Assert List page text
        cy.contains('GitHub Users');
        cy.get('button[]').click();
        expect(2).to.equal(2)
    });
});