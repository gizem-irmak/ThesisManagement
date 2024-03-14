const request = require("supertest");
const app = require("../../index");

const { Builder, By, Key, until } = require("selenium-webdriver");

describe("End to end tests for proposals by student", () => {
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
        usernameBox.sendKeys("s301316@studenti.polito.it");
        let passwordBox = await driver.findElement(By.id("password"));
        passwordBox.clear();
        passwordBox.sendKeys("s301316");
    
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


    test("The page should show list of thesis proposal, open CV and read old applications", async () => {
        await doLogin();
    
        await driver.get(baseURL);
        await checkAndCollapseNavbar();
    
        await driver.sleep(1000);
          // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
          await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);
    
    
         // Find the "Applications" link by its text
         const thProposalsLink = await driver.findElement(By.linkText('Thesis Proposals'));
    
         // Click the "Applications" link
         await thProposalsLink.click();
     
         // Wait for some time (you can replace this with proper waits)
         await driver.sleep(1000);
     
         // Assert that the navigation to the correct route occurred
         //const currentUrl = await driver.getCurrentUrl();
         await driver.wait(until.urlContains("/student-applications"), 5000);
    
          // Verify the presence of a specific table on the page
          const oldApplicationsAccordion = await driver.findElement(By.className('accordion-card-column mb-3 Old-Applications'));
    
          // Check if the table element is present
          await oldApplicationsAccordion.click();

          // Assuming driver is your Selenium WebDriver instance
          const tableApplications = await driver.findElement(By.className('table-responsive'));

          await driver.wait(until.elementIsVisible(tableApplications), 5000);
    
      // Step 1: Locate the row containing "Mobile App Development Project"
    const projectRow = await driver.wait(until.elementLocated(By.xpath("//tr[td[contains(text(), 'Mobile App Development Project')]]")), 10000);

    // Step 2: Find the file icon within this row
    const fileIcon = await projectRow.findElement(By.css(".fileperson-icon"));

    await driver.sleep(1000);

    // Step 3: Click on the file icon
    await fileIcon.click();

      await driver.sleep(1000);

      const cvButton= await driver.findElement(By.className('btn btn-primary'));

      await driver.sleep(1000);

 /*     await cvButton.click();

  
      // Wait for the new window or tab to open (adjust as needed)
      await driver.wait(until.windowIsOpen());
      */

      const greyButton = await driver.findElement(By.className('btn btn-secondary'));
      await greyButton.click();
      //CONTINUE FROM HERE

       // Verify the presence of a specific table on the page
       const AvailableProposalsAccordion = await driver.findElement(By.className('accordion-card-column mb-3 Available-Proposals'));
    
       // Check if the table element is present
       await AvailableProposalsAccordion.click();
    
       const newCardItem= await driver.findElement(By.className("card-item card"));
       await driver.sleep(1000);
       await newCardItem.click();
    
        await driver.sleep(1000);

        const whiteCloseButton= await driver.findElement(By.className("btn-close btn-close-white"));

        await whiteCloseButton.click();
    
        
        await driver.sleep(1000);
    
        await doLogout();
        
      }, 20000);

      test("The page allows students to make a new request, after input filled", async () => {
        
        await doLogin();
    
        await driver.get(baseURL);
    
        await driver.sleep(1000);
    
        await checkAndCollapseNavbar();

        //passo alla student request, finito le applications available and old nav-link student-request

        await driver.sleep(1000);
          // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
          await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);
    
    
         // Find the "Applications" link by its text
         const studentRequestLink = await driver.findElement(By.linkText('Student Request'));
    
         // Click the "Applications" link
         await studentRequestLink.click();

         await driver.wait(until.urlContains("/student-request"), 5000);

         // Fill out the form
        const titleInput=await driver.findElement(By.css('input[aria-label="Title"]'));
        titleInput.click();
        titleInput.sendKeys('Thesis Title');

        const descInput=await driver.findElement(By.css('textarea[aria-label="Description"]'));
        descInput.click();
        descInput.sendKeys('This is a detailed description of the thesis.');

        // Selecting from dropdowns might require specific handling depending on how your dropdowns are implemented.
        // Here's an example of clicking a dropdown and selecting an option:
        await driver.findElement(By.className(' css-art2ul-ValueContainer2')).click();
        //await driver.findElement(By.css('div[id^="react-select-"][id*="-option-"]')).click(); // Adjust the selector as needed
        // Wait for the dropdown options to be visible
        let optionLocator = By.xpath("//div[contains(@class, 'field-item mb-3')]//div[contains(text(), 'Mario Rossi')]");
        //check wrong or succesfull with this supervisor
        const optionElement = await driver.findElement(optionLocator);
        await optionElement.click();

        //await driver.findElement(By.csss('div[placeholder="No Co-Supervisor Selected"]')).click();
        //await driver.findElement(By.css('div[id^="react-select-"][id*="-option-"]')).click(); // Adjust the selector as needed
        // Wait for the dropdown options to be visible
       // let optionLocator2 = By.xpath("//div[contains(@class, 'field-item mb-3')]//div[contains(text(), 'Mario Rossi')]");
       await driver.sleep(1000);
        // Click the "Send Request" button
        await driver.findElement(By.className('action-allowed-button btn btn-primary')).click();

        const successToast= await driver.findElement(By.className('Toastify'));
        // Check if the modal content is visible, SUCCESS MODAL displayed
        const isToastVisible = await successToast.isDisplayed();
           expect(isToastVisible).toBe(true);
    
        await driver.sleep(2000);
    
          await doLogout();
        
      }, 20000);
    
    });    