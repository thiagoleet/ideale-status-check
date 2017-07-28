import { IdealeStatusCheckPage } from './app.po';

describe('ideale-status-check App', () => {
  let page: IdealeStatusCheckPage;

  beforeEach(() => {
    page = new IdealeStatusCheckPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
