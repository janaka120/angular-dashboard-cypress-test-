/// <reference types="cypress" />

const { rgb } = require("d3-color");

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
        
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
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
        cy.get('[data-cy="imputEmail1"]')
    });

    it('second test', () => {
        cy.visit('http://localhost:4200/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[data-cy="signInButton"]');

        cy.contains('Sign in');

        cy.contains('[status="warning"][type="submit"]', 'Sign in');

        // find() used to find elements in paraent element
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in');
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click();

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    })

    it('then and wrap methods', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Forms').click();
        cy.contains('Form Layout').click();

        // if you use `then` Cypress object becomes to JQuary object, So can not used Cypress assertion to compaire elements
        cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text(); // find(), text() methods related to JQuary
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
            
            expect(emailLabelFirst).to.equal('Email');
            expect(passwordLabelFirst).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then((secondForm) => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
                
                expect(passwordLabelFirst).to.equal(passwordLabelSecond);

                // used `wrap()` method to convert JQuary object to Cypress object, Then can used Cypress assertions
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })
    })

    it('invoke command', () => {
        cy.visit('http://localhost:4200/');
        cy.contains('Forms').click();
        cy.contains('Form Layout').click();

        //1st method 
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address').should('have.class', 'label').and('have.text', 'Email address');

        // 2nd method
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address');
            expect(label).to.have.class('label');
            expect(label).to.have.text('Email address');
        });

        // 3rd method with invoke function
        cy.get('[for="exampleInputEmail1"]').invoke('text').then((text) => {
            expect(text).to.equal('Email address');
        });

        // 1 method without invoke function
        cy.contains('nb-card', 'Basic form').find('nb-checkbox').click().find('.custom-checkbox')
            .invoke('attr', 'class').should('contain', 'checked');

        // 2nd method with invoke function
        cy.contains('nb-card', 'Basic form').find('nb-checkbox').click()
            .find('.custom-checkbox').invoke('attr', 'class').then((classValue) => {
                expect(classValue).not.to.contains('checked')
            })
    });

    it('assert property', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker').find('[placeholder="Form Picker"]').then((input) => {
            cy.wrap(input).click();
            cy.get('nb-calendar-day-picker').contains('17').click();
            cy.wrap(input).invoke('prop', 'value').should('contain','Oct 17, 2022')
            cy.wrap(input).should('have.value','Oct 17, 2022')
        })

    })

    it('check boxes', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).first().check({force: true}).should('be.checked');
            
            cy.wrap(radioButtons).eq(1).check({force: true});
            cy.wrap(radioButtons).first().should('not.be.checked');

            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    });

    it('checkboxes', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"').eq(1).check({force: true}).should('be.checked'); // to check by using `check()`
        cy.get('[type="checkbox"').eq(1).click({force: true}).should('not.be.checked'); // to uncheck by using `click()`
    });

    it('lists and dropdowns', () => {
        cy.visit('http://localhost:4200');

        // --- 1st method | only consider one item --
        // cy.get('nav nb-select').click();
        // cy.get('.options-list').contains('Dark').click();
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');
        const colors = {
            "Light": 'rgb(255, 255, 255)',
            "Dark": 'rgb(34, 43, 69)',
            "Cosmic": 'rgb(50, 50, 89)',
            "Corporate": 'rgb(255, 255, 255)',
        }
        // 2nd method | loop through all the items
        cy.get('nav nb-select').then(dropdow => {
            cy.wrap(dropdow).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();

                cy.wrap(listItem).click();
                cy.wrap(dropdow).should('contain', itemText);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
                if(index < 3) {
                    cy.wrap(dropdow).click();
                }
            })
        })
    })

    it('web tables', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();


        // update col in table
        cy.get('tbody').contains('tr', 'Larry').then(row => {
            cy.wrap(row).find('.nb-edit').click();
            cy.wrap(row).find('[placeholder="Age"]').clear().type('20');

            cy.wrap(row).find('.nb-checkmark').click();
            cy.wrap(row).find('td').eq(6).should('contain', '20')
        });

        // add new row to table
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type('test');
            cy.wrap(row).find('[placeholder="Last Name"]').type('name');
            cy.wrap(row).find('.nb-checkmark').click();
        });

        cy.get('tbody tr').first().find('td').then(col => {
            cy.wrap(col).eq(2).should('contain', 'test');
            cy.wrap(col).eq(3).should('contain', 'name');
        });

        // table search
        cy.get('thead [placeholder="Age"]').type('20');
        cy.wait(500)
        cy.get('tbody tr').each(row => {
            cy.wrap(row).find('td').eq(6).should('contain', '20');
        })

        // table search multiple
        const age = [20, 30, 40, 200];
        cy.wrap(age).each(ageValue => {
            cy.get('thead [placeholder="Age"]').clear().type(ageValue);
            cy.wait(500)
            cy.get('tbody tr').each(row => {
                if(ageValue === 200) {
                    cy.wrap(row).should('contain', 'No data found')
                }else {
                    cy.wrap(row).find('td').eq(6).should('contain', ageValue);
                }
            })
        });

    });

    it('datepicker', () => {
        function selectDayFormCurrent(day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            let futureDay = date.getDate();
            let futureMonth = date.toLocaleDateString('default', {month: 'short'});
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear();
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if(!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click();
                    selectDayFormCurrent(day);
                }else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })

            return dateAssert;
        }
        
        cy.visit('http://localhost:4200');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const numberOfDays = 40; // number of days, you need to check from today
            let dateAssert = selectDayFormCurrent(numberOfDays);
            

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
        })
    });

    it('tooltip & popup', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    })

    it('dialogbox', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // 1 method
        // cy.get('tbody tr').first().find('.nb-trash').click();
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // });
        
        // 2 method
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        });

        // // 3 method - cancel
        // cy.get('tbody tr').first().find('.nb-trash').click();
        // cy.on('window:confirm', () => false);
    })
})