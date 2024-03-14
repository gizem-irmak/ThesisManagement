const request = require("supertest");
const app = require("../../index");

const { Builder, By, Key, until } = require("selenium-webdriver");

describe("End to end tests for list of applications and check for notifications", () => {
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
    usernameBox.sendKeys("d12571@polito.it");
    let passwordBox = await driver.findElement(By.id("password"));
    passwordBox.clear();
    passwordBox.sendKeys("d12571");

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

  test("Should show list of applications after clicking on Applications tab in the navbar and see info applications opening a modal", async () => {
    await doLogin();

    await driver.get(baseURL);
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);


     // Find the "Applications" link by its text
     const applicationsLink = await driver.findElement(By.linkText('Applications'));

     // Click the "Applications" link
     await applicationsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/browse-applications"), 5000);

      // Verify the presence of a specific table on the page
      const tableElement = await driver.findElement(By.id('applications-table'));

      // Check if the table element is present
      await driver.wait(until.elementIsVisible(tableElement), 5000);

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

    const closeButton = await driver.findElement(By.css(".modal-header [aria-label='Close']"));
    await closeButton.click();

    await driver.sleep(1000);

    await checkAndCollapseNavbar();

    const notificationsButton= await driver.findElement(By.id('BellFill-icon-button'));
    await notificationsButton.click();

    const notifyPopover= await driver.findElement(By.id("notification-popover"));
    //const isPopoverVisible = await notifyPopover.isDisplayed();
    await driver.sleep(1000);

    //expect(isPopoverVisible).toBe(true); no need if i can later click and inteact with it different from tables

    const popoverCloseButton= await driver.findElement(By.id('popover-close-button'));
    await popoverCloseButton.click();

    const infoPersonIcon= await driver.findElement(By.css('.fileperson-icon'));
    await infoPersonIcon.click();
   
    const modalShow= await driver.findElement(By.className('fade modal show'));
    const isModalShowVisible = await modalShow.isDisplayed();
    //expect(isModalShowVisible).toBe(true);

    const btnClose= await driver.findElement(By.className('btn btn-secondary'));
    await btnClose.click();

    await driver.sleep(1000);

      await doLogout();
    
  }, 20000);


  test("Should show list of thesis proposals, open cards, filter and close", async () => {
    await doLogin();

    await driver.get(baseURL);
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 8000);

await driver.sleep(2000);
     // Find the "Applications" link by its text
     const proposalsLink = await driver.findElement(By.linkText('All Proposals'));

     // Click the "Applications" link
     await proposalsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/browse-proposals"), 5000);

        // Trigger the dropdown to open (if needed)
    const filterButton = await driver.findElement(By.id('dropdown-basic')); // Replace with the actual ID of your filter button
    await filterButton.click();

    // Click on the "Title" clickable text
    const titleClickableText = await driver.findElement(By.className("drop-items-Title dropdown-item"));
    await titleClickableText.click();

    // Insert an input text in the "Title" field
    const titleInput = await driver.findElement(By.className("form-control"));
    await titleInput.sendKeys("soft");

    // Press Enter on the keyboard
    await titleInput.sendKeys(Key.RETURN);

     // Find the card element by its text content
     const cardElement = await driver.findElement(By.xpath('//div[@class="card-header" and text()="Software Development Project"]'));

     // Click on the card
     await cardElement.click();

    // Check if the modal is visible
    const modalContent = await driver.findElement(By.css(".modal-content"));

    // Check if the modal content is visible
    const isModalVisible = await modalContent.isDisplayed();
    expect(isModalVisible).toBe(true);

    const closeButton = await driver.findElement(By.css(".modal-header [aria-label='Close']"));
    await closeButton.click();

    await driver.sleep(1000);

  // Check if the modal is no longer visible
  expect(await isElementVisible("proposal-modal-id")).toBe(false);


      await doLogout();
    
  }, 20000);

  test("create a new Proposal", async () => {
    await doLogin();

    await driver.get(baseURL);
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 8000);

      await driver.sleep(2000);

     // Find the "Applications" link by its text
     const proposalsLink = await driver.findElement(By.linkText('My Proposals'));

     // Click the "Applications" link
     await proposalsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/my-proposals"), 5000);

     const addButton = await driver.findElement(By.className("add-button"));

    await addButton.click();

      // Check if the modal is visible
    const modalContent = await driver.findElement(By.css(".modal-content"));

    // Check if the modal content is visible
    const isModalVisible = await modalContent.isDisplayed();
    expect(isModalVisible).toBe(true);

    // Find and interact with the Title input field
    const titleInput = await driver.findElement(By.id("field-Title"));
    await titleInput.sendKeys("Your Title");

    // Find and interact with the Type input field
    const typeInput = await driver.findElement(By.id("field-Type"));
    await typeInput.sendKeys("Your Type");

    // Find and interact with the Expiration date input (assuming you have a date picker)
    const expirationInput = await driver.findElement(By.id("field-Expiration"));
    await expirationInput.sendKeys("2023-12-31");

    // Find and interact with the Description textarea
    const descriptionTextarea = await driver.findElement(By.id("field-Description"));
    await descriptionTextarea.sendKeys("Your Description");

    // Find and interact with the Required Knowledge textarea
    const requiredKnowledgeTextarea = await driver.findElement(By.id("field-Required Knowledge"));
    await requiredKnowledgeTextarea.sendKeys("Your Required Knowledge");

    // Find and interact with the Notes textarea
    const notesTextarea = await driver.findElement(By.id("field-Notes"));
    await notesTextarea.sendKeys("Your Notes");

    // Find and interact with the Level radio button (choose "MsC")
    const levelMsCRadioButton = await driver.findElement(By.id("iconButton-MsC"));
    await levelMsCRadioButton.click();

    // Find and interact with the Save button
    const saveButton = await driver.findElement(By.id("save-button"));
    await saveButton.click();

    await driver.sleep(1000);
    const successToast= await driver.findElement(By.className('Toastify'));
     // Check if the modal content is visible, SUCCESS MODAL displayed
     const isToastVisible = await successToast.isDisplayed();
     expect(isToastVisible).toBe(true);

     await driver.sleep(1000);
    //can add check on errors on fields input in other tests
     await doLogout();
     await driver.sleep(1000);
    
  }, 20000);

  test("create a new Proposal starting from a previous one already existing", async () => {
    await doLogin();

    await driver.get(baseURL);
    await checkAndCollapseNavbar();

    await driver.sleep(1000);
      // Explicit wait for the menu to be fully expanded (adjust timeout as needed)
      await driver.wait(until.elementLocated(By.css('.nav-link')), 5000);


     // Find the "Applications" link by its text
     const proposalsLink = await driver.findElement(By.linkText('My Proposals'));

     // Click the "Applications" link
     await proposalsLink.click();
 
     // Wait for some time (you can replace this with proper waits)
     await driver.sleep(1000);
 
     // Assert that the navigation to the correct route occurred
     //const currentUrl = await driver.getCurrentUrl();
     await driver.wait(until.urlContains("/my-proposals"), 5000);

     await driver.sleep(1000);

     const accordionButton = await driver.findElement(By.className('accordion-button'));
     await accordionButton.click();

     const newCardBody=await driver.findElement(By.className('card-body'));
     await newCardBody.click();

     await driver.sleep(3000);

     const modifyButton=await driver.findElement(By.className("action-allowed-button btn btn-primary"));
     await modifyButton.click();

     const editIcon= await driver.findElement(By.css(".edit-icon"));

     await editIcon.click();

     await driver.sleep(2000);

  // Find and interact with the Save button
const whiteButton = await driver.findElement(By.className("btn-close btn-close-white"));

     await driver.sleep(1000);
    //can add check on errors on fields input in other tests
     await doLogout();
     await driver.sleep(1000);
    
  }, 20000);


});