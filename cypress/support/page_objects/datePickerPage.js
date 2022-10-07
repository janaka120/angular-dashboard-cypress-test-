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
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })

    return dateAssert;
}

export class DatePickerPage {
    selectCommonDatePickerDateFormToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const numberOfDays = dayFromToday; // number of days, you need to check from today
            let dateAssert = selectDayFormCurrent(numberOfDays);
            

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
        })
    }

    selectCommonDatePickerWithRangeFormToday(firstDay, lastDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click();
            let firstDayAssert = selectDayFormCurrent(firstDay);
            let lastDayAssert = selectDayFormCurrent(lastDay);
            
            const finalDate = `${firstDayAssert} - ${lastDayAssert}`
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate);
        })
    }


}

export const datePickerPage = new DatePickerPage();