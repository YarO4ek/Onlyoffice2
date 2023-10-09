const { remote } = require('webdriverio');
const { createObjectCsvWriter } = require('csv-writer');
const assert = require('assert');

describe('OnlyOffice Test', () => {
    let browser;
    let offices = [];

    before(async function () {
        this.timeout(10000);
        browser = await remote({
            capabilities: {
                browserName: 'firefox',
            },
        });
    });

    it('Should navigate to the OnlyOffice website', async function () {
        this.timeout(10000);
        await browser.url('https://www.onlyoffice.com');
        const title = await browser.getTitle();
        assert.strictEqual(title, 'ONLYOFFICE - Secure Online Office | ONLYOFFICE');
    });

    it('Should click on the "About" menu and navigate to "Contacts"', async function () {
        this.timeout(10000);
        const aboutNavItem = await browser.$('#navitem_about');
        for (let i = 0; i < 2; i++) {
            await aboutNavItem.click();
        }

        const aboutMenu = await browser.$('#navitem_about_menu');
        await aboutMenu.waitForDisplayed();

        await browser.execute(() => {
            document.querySelector('#navitem_about_contacts').click();
        });

        await browser.pause(2000);
    });

    it('Should extract and save office data', async function () {
        this.timeout(10000);
        const officeElements = await browser.$$('.companydata');

        for (const element of officeElements) {
            const officeData = {};

            try {
                const region = await element.$('.region');
                if (region) {
                    officeData.Region = await region.getText();
                }
            } catch (error) {
            }

            try {
                const companyName = await element.$('b');
                if (companyName) {
                    officeData.CompanyName = await companyName.getText();
                }
            } catch (error) {
            }



            offices.push(officeData);
        }

        if (offices.length > 0) {
            const csvWriter = createObjectCsvWriter({
                path: 'offices.csv',
                header: [
                    { id: 'Region', title: 'Region' },
                    { id: 'CompanyName', title: 'CompanyName' },
                    { id: 'StreetAddress', title: 'StreetAddress' },
                    { id: 'AddressCountry', title: 'AddressCountry' },
                    { id: 'PostalCode', title: 'PostalCode' },
                    { id: 'Telephone', title: 'Telephone' },
                ],
            });

            await csvWriter.writeRecords(offices);
        }
    });

    after(async () => {
        if (browser) {
            await browser.deleteSession();
        }
    });
});
