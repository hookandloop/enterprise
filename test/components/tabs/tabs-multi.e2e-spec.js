const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = require('../../helpers/e2e-config.js');

requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Tabs Multi tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs-multi/example-index');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('should display a tooltip when hovering a tab with cut-off text', async () => {
    await browser.actions()
      .mouseMove(await element(by.id('tabs-one-contracts-1')))
      .perform();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('tooltip'))), config.waitsFor);

    expect(await element(by.id('tooltip')).getAttribute('class')).not.toContain('is-hidden');
    expect(await element(by.id('tooltip')).getText()).toEqual('Contracts (and then a few more Contracts)');

    await browser.actions()
      .mouseMove(await element(by.id('tabs-one-opportunities-1')))
      .perform();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('tooltip'))), config.waitsFor);
    await browser.driver.sleep(config.sleep);

    expect(await element(by.id('tooltip')).getAttribute('class')).toContain('is-hidden');
    expect(await element(by.id('tooltip')).getText()).toEqual('');
  });
});