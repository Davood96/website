/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var calc_model = null;

function init()
{
    calc_model = new CALC_MODEL();
}

function kill_calculator()
{
    calc_model = null;
}

function hello()
{
    alert("Hello");
}

function registerKey(key)
{ 
    if(calc_model === null)
    {
        init();
    }
    var history_field = window.document.getElementById("history");
    var value_field = window.document.getElementById("main");
    var result = calc_model.registerModel(key, history_field.innerHTML, value_field.innerHTML);
    value_field.innerHTML = result[0];
    history_field.innerHTML = result[1];
}

function undoKey()
{
    if(!calc_model.isInitial())
    {
         var history_field = window.document.getElementById("history");
         var value_field = window.document.getElementById("main");
         var result = calc_model.undoModel();
         value_field.innerHTML = result[0];
         history_field.innerHTML = result[1];
    }
   
}
