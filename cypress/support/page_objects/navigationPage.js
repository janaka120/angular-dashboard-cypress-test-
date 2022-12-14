function selectGroupMenuItem(name){
    cy.contains('a', name).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if(attr.includes('left')) {
                cy.wrap(menu).click();
            }
        });
    });
}

export class NavigationPage{
    formLayoutsPage() {
        selectGroupMenuItem('Form');
        cy.contains('Form Layouts').click();
    }

    datePickerPage() {
        selectGroupMenuItem('Form');
        cy.contains('Datepicker').click();
    }

    smartTablePage() {
        selectGroupMenuItem('Tables & Data');
        cy.contains('Smart Table').click();
    }

    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Tooltip').click();
    }
}

export const navigateTo = new NavigationPage(); 