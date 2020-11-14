const addMenuButton = document.querySelector('.add-menu');

const AddMenuText = document.querySelector('.menu-li');


addMenuButton.addEventListener('click', event => {
    event.preventDefault();
    addMenuButton.classList.toggle('valide');
    AddMenuText.classList.toggle('valide');

})