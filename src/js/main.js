document.addEventListener('DOMContentLoaded', function() {
    //при загрузке стр заменяет цветной фон на img
    BackgroundReplacement('#body', 'b-body-background__background-img');
});

function BackgroundReplacement(selector, className)
{
    var element = document.querySelector(selector);
    element.classList.add(className);
}

function GetAllElementsByClass(id, className)
{
    document.getElementById(id).getElementsByClassName(className);
}

function RoomSelection()
{
    let allBlocks =  GetAllElementsByClass('roomsAndPrices', 'b-prices-rooms__block');
    let allButtons = GetAllElementsByClass('roomsAndPrices', 'b-prices-rooms__button');
}