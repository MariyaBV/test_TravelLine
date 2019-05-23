document.addEventListener('DOMContentLoaded', function() {
    BackgroundReplacement('#body', 'b-body-background__background-img');
    RoomSelection('roomsAndPrices', 'b-prices-rooms__button', 'visited-card', "Забронировать", "Подробнее");
    Cancellation('roomsAndPrices', 'b-prices-rooms__button', 'b-prices-rooms__col', 'visited-card', "Подробнее", "Забронировать");
});

function BackgroundReplacement(selector, className)
{
    var element = document.querySelector(selector);
    element.classList.add(className);
}

function GetAllElementsByClass(idParent, className)
{
    return document.getElementById(idParent).getElementsByClassName(className);
}

function AddClass(element, className)
{
    element.classList.add(className);
}

function RemoveClass(element, className)
{
    element.classList.remove(className);
}

function ChangeText(element, firstText, textToBeChanged)
{
    element.innerHTML = element.innerHTML.replace(firstText, textToBeChanged);
}

function RoomSelection(parentId, classOfButtons, classForVisitedCard, initialButtonName, newButtonName)
{
    let allButtons = GetAllElementsByClass(parentId, classOfButtons);

    for (let i = 0; i < allButtons.length; i++)
    {
        let parent = allButtons[i].parentNode.parentNode.parentNode.parentNode;

        allButtons[i].onclick = function() {
            if (!parent.classList.contains(classForVisitedCard))
            {
                AddClass(this, 'clicked');
            }
            parent.onmouseout = function() {
                if (allButtons[i].classList.contains('clicked'))
                {
                    AddClass(parent, classForVisitedCard);
                    RemoveClass(allButtons[i], 'clicked');
                    ChangeText(allButtons[i], initialButtonName, newButtonName);
                }
            }
        }
    }
}

function Cancellation(parentId, classOfButtons, classOfCards, classForVisitedCard, initialButtonName, newButtonName)
{
    let allCard = GetAllElementsByClass(parentId, classOfCards);
    let allButtons = GetAllElementsByClass(parentId, classOfButtons);

    for (let i = 0; i < allCard.length; i++)
    {
        allCard[i].onclick = function(event)
        {
            if(event.target.closest('.' + classOfCards)) // || this.srcElement)
            {
                if (allCard[i].classList.contains(classForVisitedCard))
                {
                    RemoveClass(allCard[i], classForVisitedCard);
                    ChangeText(allButtons[i], initialButtonName, newButtonName);
                }
            }
        }
    }
}