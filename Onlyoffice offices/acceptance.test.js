const { remote } = require('webdriverio');

describe('Acceptance Tests', () => {
    let browser;

    beforeAll(async () => {
        browser = await remote({
            capabilities: {
                browserName: 'firefox',
            },
        });
    });

    afterAll(async () => {
        if (browser) {
            await browser.deleteSession();
        }
    });

    test('Test program functionality', async () => {
        await browser.url('https://www.onlyoffice.com');

        // Нажать на элемент с id="navitem_about" два раза
        const aboutNavItem = await browser.$('#navitem_about');
        for (let i = 0; i < 2; i++) {
            await aboutNavItem.click();
        }

        // Ожидание появления элемента с id="navitem_about_menu"
        const aboutMenu = await browser.$('#navitem_about_menu');
        await aboutMenu.waitForDisplayed();

        // Используем JavaScript для нажатия на элемент с id="navitem_about_contacts"
        await browser.execute(() => {
            document.querySelector('#navitem_about_contacts').click();
        });

        // Ожидание загрузки новой страницы
        await browser.pause(2000); // Подождем 2 секунды (возможно, потребуется больше времени)

        // Получение списка окон
        const windowHandles = await browser.getWindowHandles();
        const newTabHandle = windowHandles.pop(); // Берем последнюю вкладку

        // Переключение на новую вкладку
        await browser.switchToWindow(newTabHandle);

        // Поиск информации об офисах на странице
        const officeElements = await browser.$$('.companydata');

        const offices = [];
        for (const element of officeElements) {
            const officeData = {};

            try {
                const region = await element.$('.region');
                if (region) {
                    officeData.Region = await region.getText();
                }
            } catch (error) {}

            try {
                const companyName = await element.$('b');
                if (companyName) {
                    officeData.CompanyName = await companyName.getText();
                }
            } catch (error) {}

            try {
                const streetAddress = await element.$('[itemprop="streetAddress"]');
                if (streetAddress) {
                    officeData.StreetAddress = await streetAddress.getText();
                }
            } catch (error) {}

            try {
                const addressCountry = await element.$('[itemprop="addressCountry"]');
                if (addressCountry) {
                    officeData.AddressCountry = await addressCountry.getText();
                }
            } catch (error) {}

            try {
                const postalCode = await element.$('[itemprop="postalCode"]');
                if (postalCode) {
                    officeData.PostalCode = await postalCode.getText();
                }
            } catch (error) {}

            try {
                const telephone = await element.$('[itemprop="telephone"]');
                if (telephone) {
                    officeData.Telephone = await telephone.getText();
                }
            } catch (error) {}

            // Добавляем офис в список, даже если не все элементы были найдены
            offices.push(officeData);
        }

        // Проверка работы программы: например, ожидаем, что найдено больше чем 0 офисов.
        expect(offices.length).toBeGreaterThan(0);
    });
});
