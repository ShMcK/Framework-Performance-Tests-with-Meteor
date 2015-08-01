/**
* Performance Test Page Objects (UNUSED)
*/

var Page = function () {
  var resetBtn = driver.findElement(By.id('reset'));
  var runBtn = driver.findElement(By.id('run'));
  var table = driver.findElement(By.tagName('table'));

  function getCountBtn (number) {
    return driver.findElement(by.id(number.toString()));
  }
};

module.exports = new Page();