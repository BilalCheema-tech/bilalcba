# Commonwealth Bank UI Automation Test

## Node Dependencies 
- Playwirght

## Install Dependencies
- Install dependencies `npm install`
- Install playwrighttes `npm i -D @playwright/test`
- Install supported browsers `npx playwright install`

## Run all Tests in test folder            
- Run from Command Line `npx playwright test`

### Specify headless to run tests in headless mode
- Run from Command Line `npx playwright test --headed`

### Specify Browser
- Run from Command Line `npx playwright test --browser=chromium`

### Specify all browsers to run tests in chromem,firefox and webkit simulataneoulsy
- Run from Command Line `npx playwright test --browser=all`

### Run a signgle test file
- Run from Command Line `npx playwright test tests/responsiveFightTests.spec.ts`
