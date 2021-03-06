window.onload = function() {
    MaximumHeightAlignment('roomsAndPrices', "b-prices-rooms__subtitle");
    MaximumHeightAlignment('roomsAndPrices', "b-prices-rooms__text");
    ClosestPolyfill();
    RoomSelection('roomsAndPrices', 'b-prices-rooms__button', "Забронировать", "Подробнее");
    Cancellation('roomsAndPrices', 'b-prices-rooms__button', 'b-prices-rooms__col', "Подробнее", "Забронировать");
}

window.onresize = function()
{
    MaximumHeightAlignment('roomsAndPrices', "b-prices-rooms__subtitle");
    MaximumHeightAlignment('roomsAndPrices', "b-prices-rooms__text");
}

function ClosestPolyfill()
{
    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    
    }

    if (!Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function(css) {
            var node = this;
        
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
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

function RoomSelection(parentId, classOfButtons, initialButtonName, newButtonName)
{
    let allButtons = GetAllElementsByClass(parentId, classOfButtons);

    for (let i = 0; i < allButtons.length; i++)
    {
        let parent = allButtons[i].parentNode.parentNode.parentNode.parentNode;

        allButtons[i].onclick = function() {
            if (!parent.classList.contains('visited'))
            {
                AddClass(this, 'clicked');
            }
            parent.onmouseleave = function() {
                if (allButtons[i].classList.contains('clicked'))
                {
                    AddClass(parent, 'visited');
                    RemoveClass(allButtons[i], 'clicked');
                    ChangeText(allButtons[i], initialButtonName, newButtonName);
                }
            }
        }
    }
}

function Cancellation(parentId, classOfButtons, classOfCards, initialButtonName, newButtonName)
{
    let allCard = GetAllElementsByClass(parentId, classOfCards);
    let allButtons = GetAllElementsByClass(parentId, classOfButtons);

    for (let i = 0; i < allCard.length; i++)
    {
        allCard[i].onclick = function(event)
        {
            let target = event.target || event.srcElement;

            if(target.closest('.' + classOfCards))
            {
                if (allCard[i].classList.contains('visited'))
                {
                    RemoveClass(allCard[i], 'visited');
                    ChangeText(allButtons[i], initialButtonName, newButtonName);
                }
            }
        }
    }
}

function MaximumHeightAlignment(parentId, classOfElement)
{
    let allElements = GetAllElementsByClass(parentId, classOfElement);
    let maxH = MaxHeight(parentId, classOfElement);

    for (let i = 0; i < allElements.length; i++)
    {
        allElements[i].style.height = maxH + 'px';
    }
}

function MaxHeight(parentId, classOfElement)
{
    let allElements = GetAllElementsByClass(parentId, classOfElement);
    let maxH = allElements[0].offsetHeight;

    for (let i = 0; i < allElements.length; i++)
    {
        maxH = (allElements[i].offsetHeight > maxH) ? allElements[i].offsetHeight : maxH;
    }

    return maxH;
}