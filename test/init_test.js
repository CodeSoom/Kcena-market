Feature('Home');

Scenario('Title을 볼 수 있다.', (I) => {
  I.amOnPage('/');

  I.see('당근 마켓');
});
