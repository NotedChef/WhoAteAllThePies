import { WhoAteAllThePiesPage } from './app.po';

describe('who-ate-all-the-pies App', () => {
  let page: WhoAteAllThePiesPage;

  beforeEach(() => {
    page = new WhoAteAllThePiesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
