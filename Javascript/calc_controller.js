/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var model = null;
var history_field;
var value_field;

function init()
{
    model = new MODEL();
    history_field = window.document.getElementById("history");
    value_field = window.document.getElementById("main");
}

function hello(str)
{
    alert("Hello");
}

function registerKey(key)
{ 
    if(model === null)
    {
        init();
    }
    var result = model.registerModel(key, history_field.innerHTML, value_field.innerHTML);
    value_field.innerHTML = result[0];
    history_field.innerHTML = result[1];
}

function undoKey()
{
    if(!model.isInitial())
    {
         var result = model.undoModel();
         value_field.innerHTML = result[0];
         history_field.innerHTML = result[1];
    }
   
}


