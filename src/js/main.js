document.addEventListener('DOMContentLoaded', function() {
    //при загрузке стр заменяет цветной фон на img
    BackgroundReplacement();
});

function BackgroundReplacement()
{
    var element = document.querySelector('#body');
    element.classList.add('b-body-background__background-img');
}