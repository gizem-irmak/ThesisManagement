const request = require("supertest");
const app = require("../../index");

const { Builder, By, Key, until } = require("selenium-webdriver");

describe("End to end tests for handling requests by secretary", () => {
    //uploaded new stories
      async function isElementVisible(selector) {
        try {
          const element = await driver.findElement(By.css(selector));
          return await element.isDisplayed();
        } catch (error) {
          // If the element is not found, consider it not visible
          return false;
        }
      }
      
      let driver;
      let baseURL = `http://localhost:5173`;
    
      async function checkAndCollapseNavbar() {
        const isNavbarCollapsed = await isElementVisible('.navbar-toggler-icon');
        if (isNavbarCollapsed) {
          const hamburgerMenuIcon = await driver.findElement(By.css('.navbar-toggler-icon'));
          await hamburgerMenuIcon.click();
        }
      }
    
      const doLogin = async () => {
        await driver.get(baseURL);
    
        await driver.sleep(1000);
    
        // perform login
        let usernameBox = await driver.findElement(By.id("username"));
        usernameBox.clear();
        usernameBox.sendKeys("c00001@secretary-email.com");
        let passwordBox = await driver.findElement(By.id("password"));
        passwordBox.clear();
        passwordBox.sendKeys("c00001");
    
        await driver.sleep(1000);
    
        //const submitButton = await driver.findElement(By.className("cf4ff3b5d c5faccce1 cfccd0b2a c901653c3 cd1bb01a0"));
        const submitButton=await driver.findElement(By.css("button[data-action-button-primary='true']"));
        
        // remove disabled property from button
       /* await driver.executeScript(
          "arguments[0].removeAttribute('disabled')",
          submitButton
        );*/
    
        // click submit button with js
        await driver.executeScript("arguments[0].click();", submitButton);
    
        await driver.sleep(1000);
    
        await driver.get(baseURL);
    
        await driver.sleep(1000);
      };
    
      async function doLogout() {
        await driver.get(baseURL);
        await driver.sleep(1000);
    
        await checkAndCollapseNavbar();
      
        await driver.sleep(1000);
    
        const logoutLinkButton = await driver.findElement(By.css('#link-logout-navbar-button'));
        await logoutLinkButton.click();
    
        await driver.sleep(1000);
      }
     //try to use wait instead of sleep for better synchro
     beforeAll(async () => {
      driver = await new Builder().forBrowser("chrome").build();
    });
    
    afterAll(async () => {
      await driver.quit();
    });


    test("The page should show list of requests by students", async () => {
        await doLogin();
    
        await driver.get(baseURL);
        await checkAndCollapseNavbar();
    
        await driver.sleep(1000);
          // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
          await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);
    
    
         // Find the "Applications" link by its text
         const linkSecretaryRequests = await driver.findElement(By.id('nav-link secretary-requests'));
    
         // Click the "Applications" link
         await linkSecretaryRequests.click();
     
         // Wait for some time (you can replace this with proper waits)
         await driver.sleep(1000);
     
         // Assert that the navigation to the correct route occurred
         //const currentUrl = await driver.getCurrentUrl();
         await driver.wait(until.urlContains("/secretary-requests"), 5000);
    
           // Verify the presence of a specific table on the page
      const tableElement = await driver.findElement(By.className("table-responsive"));

      // Check if the table element is present
      await driver.wait(until.elementIsVisible(tableElement), 5000); //locate table 
    
         // Assuming driver is your Selenium WebDriver instance
         const infoIcon = await driver.findElement(By.css('.info-icon'));

         // Click the info icon
         await infoIcon.click();
   
       // Wait for some time (you can replace this with proper waits)
       await driver.sleep(1000);
   
       // Check if the modal is visible
       const modalContent = await driver.findElement(By.css(".modal-content"));
   
       // Check if the modal content is visible
       const isModalVisible = await modalContent.isDisplayed();
       expect(isModalVisible).toBe(true);

       await driver.sleep(1000);
   
       const closeButton = await driver.findElement(By.css(".modal-header [aria-label='Close']"));
       await closeButton.click();
   
       await driver.sleep(1000);

      const greenButton = await driver.findElement(By.className('btn btn-success btn-sm'));
      await greenButton.click(); //try to approve REQUEST

      await driver.sleep(1000);
       // wait until the modal appears
       const warningSwalModal = await driver.findElement(By.className('swal-modal'));

       const isWarnModalVisible = await warningSwalModal.isDisplayed();
       expect(isWarnModalVisible).toBe(true);
    
       const dangerButton= await driver.findElement(By.className("swal-button swal-button--confirm swal-button--danger"));
    
       await dangerButton.click();
    
       
        //success modal appears
        await driver.sleep(2000);

        const successToast= await driver.findElement(By.className('Toastify'));
        // Check if the modal content is visible, SUCCESS MODAL displayed
        const isToastVisible = await successToast.isDisplayed();

        await driver.sleep(1000);
        expect(isToastVisible).toBe(true);
        
        await driver.sleep(1000);
    
        await doLogout();
        
      }, 20000);


    });    