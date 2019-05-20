import "../style/main.scss";
import 'jquery';
import 'popper.js';
import 'bootstrap';

$(document).ready(function () {
    //при загрузке стр заменяет цветной фон на img
    BackgroundReplacement();
});

function BackgroundReplacement()
{
    $('#body').addClass('b-body-background__background-img');
}