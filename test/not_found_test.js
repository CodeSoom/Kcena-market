Feature('NotFound');

Scenario('존재하지 않는 url 접근 시 NotFound 페이지를 보여준다.', (I) => {
  I.amOnPage('/any_not_exist_url');

  I.see('404 Not Found');
});
