import {navigateTo} from '../support/page_objects/navigationPage';
import {onFormLayoutsPage} from '../support/page_objects/formLayoutsPage';
import {datePickerPage} from '../support/page_objects/datePickerPage';
import {onSmartTablePage} from '../support/page_objects/smartTablePage';

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage();
    });

    it('verify navigation ', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
    });

    it('should submit Inline and Basic form and select tomorrow date in the calender', () =>{
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('test', 'test@sample.com');
        onFormLayoutsPage.submitInlineFormWithEmailAndPassword('test2@sample.com', 'password');
    });

    it('should display selcted date on date feild', () =>{
        navigateTo.datePickerPage();
        datePickerPage.selectCommonDatePickerDateFormToday(40);
        datePickerPage.selectCommonDatePickerWithRangeFormToday(4, 7);
    });

    it('should smart table work', () =>{
        navigateTo.smartTablePage();
        onSmartTablePage.updateAgeByFirstName('Larry', 20);
        onSmartTablePage.addNewRowWithFirstNameAndLastName('test', 'sample');
        onSmartTablePage.searchOnTableByAge(20);
        onSmartTablePage.searchOnTableByMultiAges([20, 30, 40, 200]);
        onSmartTablePage.deleteRowByIndex(2);
    });
})