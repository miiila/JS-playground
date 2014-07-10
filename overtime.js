// ==UserScript==
// @name        Přesčasy
// @namespace   QCM.vykazy
// @include     http://vykazy.brno.qcm.cz/index.php?m=report&a=getVP&month=2014-07&user=181
// @version     1
// @grant       none
// ==/UserScript==

function getSaldoTimeString(miliseconds) {
    var hours =  Math.floor(miliseconds / (60 * 60 * 1000));
    var minutes = Math.floor((miliseconds % (60 * 60 * 1000)) / (60 * 1000 ));
    var minutes = String(minutes).length == 1 ? '0'+minutes : minutes;
    var sign = '+';
    if (miliseconds > 0) {
        var sign = '-';
    }
    return String(sign+hours+':'+minutes);
}

function setCellColour(cell,miliseconds) {
    cell.style.color = '#00ff00';
    
    if (miliseconds > 0) {
       cell.style.color="#ff0000";
    }
    
    return cell;
}

function countPlanovanaDochazka() {
    var today = new Date().getDate();
    var monthStart = new Date().setDate(1);
    var monthEnd = new Date().setDate(today+1);
    var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    var weekends = parseInt(monthLength / 7) ;
    var monthLength = monthLength - (weekends * 2);
    
    return parseFloat(monthLength * 8);;
}

function getDochazka(tabulka) {
    return parseFloat(tabulka.getElementsByTagName('tr')[3].getElementsByClassName('num')[0].innerHTML.replace(',','.').trim());
}

function insertCell(tabulka) {
    return tabulka.getElementsByTagName('tr')[3].insertCell(-1);
}

function getSaldoMiliseconds(tabulka) {
    return (countPlanovanaDochazka() - getDochazka(tabulka)) * 60 * 60 * 1000;
}
//**********************************************************************************//

var tabulka = document.getElementById('vp').getElementsByClassName('white thin')[0];

var saldoMiliseconds = getSaldoMiliseconds(tabulka);
var newCell = setCellColour(insertCell(tabulka),saldoMiliseconds);

newCell.innerHTML = getSaldoTimeString(saldoMiliseconds);
