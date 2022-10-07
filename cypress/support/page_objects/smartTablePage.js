export class SmartTable {

    updateAgeByFirstName(firstName, age) {
        // update col in table
        cy.get('tbody').contains('tr', firstName).then(row => {
            cy.wrap(row).find('.nb-edit').click();
            cy.wrap(row).find('[placeholder="Age"]').clear().type(age);
    
            cy.wrap(row).find('.nb-checkmark').click();
            cy.wrap(row).find('td').eq(6).should('contain', age)
        });
    }

    addNewRowWithFirstNameAndLastName(firstName, lastName) {
        // add new row to table
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type(firstName);
            cy.wrap(row).find('[placeholder="Last Name"]').type(lastName);
            cy.wrap(row).find('.nb-checkmark').click();
        });

        cy.get('tbody tr').first().find('td').then(col => {
            cy.wrap(col).eq(2).should('contain', firstName);
            cy.wrap(col).eq(3).should('contain', lastName);
        });

    }

    // age = 20
    searchOnTableByAge(age) {
        // table search
        cy.get('thead [placeholder="Age"]').type(age);
        cy.wait(500)
        cy.get('tbody tr').each(row => {
            cy.wrap(row).find('td').eq(6).should('contain', age);
        });
    }

    // const ageArray = [20, 30, 40, 200];
    searchOnTableByMultiAges(ageArray) {
        // table search multiple
        cy.wrap(ageArray).each(ageValue => {
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
    }

    deleteRowByIndex(index) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        });
    }

}

export const onSmartTablePage = new SmartTable();