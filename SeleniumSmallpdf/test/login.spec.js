const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

const fs = require('fs');
const path = require('path');


async function tomarCaptura(driver, nombre) {
    const image = await driver.takeScreenshot();
    const ruta = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta);
    fs.writeFileSync(path.join(ruta, `${nombre}.png`), image, 'base64');
}


describe("Login", () => {
    it('Login with standar_user credentials', async () => {
        let driver = new Builder().forBrowser(Browser.EDGE).build();
        await driver.get('https://smallpdf.com/')
        //await tomarCaptura(driver, '01-pagina-principal');


        await driver.findElement(By.css('.sc-11drgl3-0.sc-1irxw29-1.ireDIG.RsMma')).click();
        //await driver.findElement(By.xpath('//button[text()="Log in"]')).click();
        //await driver.findElement(By.id('__cond-2636324')).click();
        await driver.wait(until.elementLocated(By.css('form.vvqdhv-1.jQsqUR')), 15000);
        const form = await driver.findElement(By.css('form.vvqdhv-1.jQsqUR'));
        const inputs = await form.findElements(By.css('input'));

        await inputs[0].sendKeys('sjosemanuel428@gmail.com');
        await inputs[1].sendKeys('ffimBpS1yf0Tbd');
        //await tomarCaptura(driver, '02-datos-ingresados');
        //await driver.findElement(By.css('.r5ea4x-0.djhRY input')).sendKeys('sjosemanuel428@gmail.com');
        //await driver.findElement(By.css('.sc-1wunvx4-0.enPiKg')).sendKeys('ffimBpS1yf0Tbd');
        const loginBtn = await form.findElement(By.css('button[type="submit"]'));
        await driver.wait(until.elementIsVisible(loginBtn), 5000);
        await driver.wait(until.elementIsEnabled(loginBtn), 5000);
        await loginBtn.click();
        //await tomarCaptura(driver, '03-despues-click-login'); 
        
        //pdf to word
        await driver.wait(until.elementLocated(By.xpath('//button[div[contains(text(), "PDF")]]')), 15000);
        const boton = await driver.findElement(By.xpath('//button[div[contains(text(), "PDF")]]'));
        await boton.click();

        /*const allInputs = await driver.findElements(By.css('input[type="file"]'));

        for (let i = 0; i < allInputs.length; i++) {
            const isDisplayed = await allInputs[i].isDisplayed();
            const isEnabled = await allInputs[i].isEnabled();
            console.log(`Input #${i} -> Visible: ${isDisplayed}, Enabled: ${isEnabled}`);
        }*/

        await tomarCaptura(driver, '04');
        await driver.wait(until.elementLocated(By.css('input[type="file"]')), 15000);
        const inputFile = await driver.findElement(By.css('input[type="file"]'));

        const filePath = path.resolve(__dirname, '..', 'archivos', 'ejemplo1.pdf');
        await inputFile.sendKeys(filePath);
        await tomarCaptura(driver, '05');
        //boton descargar
        await driver.wait(until.elementLocated(By.css('.sc-1bu7qfl-0.bGbCKV.sc-1az4ycp-1.ebRjiG')), 15000);
        const linkdownload = await driver.findElement(By.css('.sc-1bu7qfl-0.bGbCKV.sc-1az4ycp-1.ebRjiG'));
        await linkdownload.click();
        await tomarCaptura(driver, '06');
        //fin de pdf to word//

        //Unir pdf//
        await driver.get('https://smallpdf.com/#r=app')

        await driver.wait(until.elementLocated(By.xpath('//button[div[contains(text(), "Merge")]]')), 15000);
        const boton2 = await driver.findElement(By.xpath('//button[div[contains(text(), "Merge")]]'));
        await boton2.click();

        await tomarCaptura(driver, '07');
        await driver.wait(until.elementLocated(By.css('input[type="file"]')), 15000);
        const inputFileMerge = await driver.findElement(By.css('input[type="file"]'));
        const file1 = path.resolve(__dirname, '..', 'archivos', 'ejemplo1.pdf');
        const file2 = path.resolve(__dirname, '..', 'archivos', 'ejemplo2.pdf');
        await inputFileMerge.sendKeys(`${file1}\n${file2}`);

        /*
        //primer archivo 
        await driver.wait(until.elementLocated(By.css('input[type="file"]')), 15000);
        const inputFile2 = await driver.findElement(By.css('input[type="file"]'));

        const filePath2 = path.resolve(__dirname, '..', 'archivos', 'ejemplo1.pdf');
        await inputFile2.sendKeys(filePath2);

        */

        await driver.wait(until.elementLocated(By.css('.sc-11drgl3-0.sc-1az4ycp-0.ireDIG.hofZyb.sc-1fxxbvc-0.hwfzjs')), 15000);
        const FinishMerge = await driver.findElement(By.css('.sc-11drgl3-0.sc-1az4ycp-0.ireDIG.hofZyb.sc-1fxxbvc-0.hwfzjs'));
        await FinishMerge.click();
        //boton unir                                              

        await driver.wait(until.elementLocated(By.xpath('//button[.//span[text()="Download"]]')), 15000);
        const linkdownloadMerge = await driver.findElement(By.xpath('//button[.//span[text()="Download"]]'));
        await linkdownloadMerge.click();
        await tomarCaptura(driver, '08');


        await driver.get('https://smallpdf.com/#r=app')
        ///unir pdf terminado/////

        //Comprimir pdf//

        await driver.wait(until.elementLocated(By.xpath('//button[div[contains(text(), "Compress")]]')), 15000);
        const botonComprimir = await driver.findElement(By.xpath('//button[div[contains(text(), "Compress")]]'));
        await botonComprimir.click();

        await driver.wait(until.elementLocated(By.css('input[type="file"]')), 15000);
        const inputFileCompress = await driver.findElement(By.css('input[type="file"]'));

        const filePathCompress = path.resolve(__dirname, '..', 'archivos', 'ejemplo1.pdf');
        await inputFileCompress.sendKeys(filePathCompress);
        await tomarCaptura(driver, '09');

        await driver.wait(until.elementLocated(By.xpath('//button[.//span[text()="Compress"]]')), 15000);
        const Compress = await driver.findElement(By.xpath('//button[.//span[text()="Compress"]]'));
        await Compress.click();
        await tomarCaptura(driver, '010');
        //boton descargar
        await driver.wait(until.elementLocated(By.xpath('//button[.//span[text()="Download"]]')), 15000);
        const linkdownloadCompress = await driver.findElement(By.xpath('//button[.//span[text()="Download"]]'));
        await linkdownloadCompress.click();
        await tomarCaptura(driver, '11');
        //Comrimir pdf Fin//

        //Cerrar secion//
        await driver.get('https://smallpdf.com/#r=app')

        await driver.wait(until.elementLocated(By.id('__cond-24')), 15000);
        const logout = await driver.findElement(By.id('__cond-24'));
        logout.click();
        await tomarCaptura(driver, '12');
        await driver.wait(until.elementLocated(By.xpath('//li[.//span[text()="Log out"]]')), 15000);
        const lg = await driver.findElement(By.xpath('//li[.//span[text()="Log out"]]'));
        await lg.click();

        await tomarCaptura(driver, '13');



        await driver.sleep(20000)
        await driver.quit();
        
    });
});