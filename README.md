### Ngx-Admin Angular 8 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Cypress.

The original repo is here: https://github.com/akveo/ngx-admin


/* <input 
    _ngcontent-phi-c19="" 
    data-cy="imputEmail1" 
    fullwidth="" 
    id="inputEmail1" 
    nbinput="" 
    placeholder="Email" 
    type="email" 
    ng-reflect-full-width="" 
    class="input-full-width size-medium shape-rectangle">
    </input> */

describe('cypress differnt ways to get', () => {
    it('how to pick test element', () => {
        // get by Tag name
        cy.get('input')

        // by Id `#`
        cy.get('#inputEmail1');

        // by Class name `.` | can use only one classname
        cy.get('.input-full-width');

        // by Attribute name
        cy.get('[placeholder]')

        // by Attribute name and value
        cy.get('[placeholder="Email"]')

        // by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]');

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        // by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

        // The most recommanded way by Cypress
        cy.get('[data-cy="inputEmail1"]')
    })
})
