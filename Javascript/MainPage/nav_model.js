/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * 
 * @param {STRING} url - the relative filepath 
 * @param update - the update function
 * @returns {NAV_BAR}
 */
NAV_BAR = function(url, update)
{
    this.url = url;
    this.update = update;
};

/**
 * An encapsulation of the navigation bar's
 * business logic
 * @returns {NAV_MODEL}
 */
NAV_MODEL = function()
{
    this.imp = new ArrayBuffer(3);
    this.imp[0] = new NAV_BAR("Text/about_me.html", 
                  function()
                  {
                      document.getElementById("Content_space").innerHTML = this.responseText;
                  });
    this.imp[1] = new NAV_BAR("Text/projects.html", 
                  function()
                  {
                      document.getElementById("Content_space").innerHTML = this.responseText;
                  });
    this.imp[2] = new NAV_BAR("Text/contact.txt", 
                  function()
                  {
                      document.getElementById("Content_space").innerHTML = this.responseText;
                  });
    this.currBar = 0;
};

/**
 * Register a user seleection of a navigation bar 
 * @param {INTEGER} id - the slected
 *                       navigation bar's id
 */
NAV_MODEL.prototype.clickBar = function(id)
{
    //alert("Hi");
    this.currBar = id;
    var next = this.imp[id];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = next.update;
    xhttp.open("GET", next.url, true);
    xhttp.send();
};