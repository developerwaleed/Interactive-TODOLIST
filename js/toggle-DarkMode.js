const changeModeButton = document.getElementById('mode');
const stylesheet = document.styleSheets[0];
const listItems = document.querySelectorAll('.list-item');
const listItemsText = document.querySelectorAll('.input-task');
const checkBoxs = document.querySelectorAll('.checkbox');

changeModeButton.addEventListener('click', () => {
  changeModeButton.classList.toggle('fa-sun');
  const parentElem = changeModeButton.parentElement;
  parentElem.classList.toggle('mobile-DarkMode-BG');
  document.body.classList.toggle('body-darkmode');
  listItems.forEach((elem) => {
    elem.classList.toggle('dark-Mode');
  });
  listItemsText.forEach((elem) => {
    elem.classList.toggle('dark-text-color');
  });
  checkBoxs.forEach((elem) => {
    elem.classList.toggle('checkBox-Color');
  });
});
