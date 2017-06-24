/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const local_link = 'http://localhost:8080/MyApp/';

function new_tab_url(url)
{
    window.open(url);
}

function goto(html_file)
{
    window.location.href = local_link + html_file;
}

var nav_model = null;

function change(id)
{
    //alert("Called");
    if(nav_model === null)
        nav_model = new NAV_MODEL();
    
    if(id !== nav_model.currBar)
    {
        //alert("IN");
        document.getElementById(nav_model.currBar + 1).style["opacity"] = "1";
        document.getElementById(id + 1).style["opacity"] = "0.5";
        nav_model.clickBar(id);
    }
       
}


NAV_BAR = function(url, update)
{
    this.url = url;
    this.update = update;
};

NAV_MODEL = function()
{
    this.imp = new ArrayBuffer(3);
    this.imp[0] = new NAV_BAR("Text/about_me.txt", 
                  function()
                  {
                      document.getElementById("Content_space").innerHTML = this.responseText;
                  });
    this.imp[1] = new NAV_BAR("Text/projects.txt", 
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



MODAL_MODEL = function()
{};

MODAL_MODEL.prototype.showModal = function(modal_func)
{
    modal_func();
    document.getElementById('modal_space').style['display'] = 'block';
};


var modal_model = null;
function open_modal(func)
{
    //alert(project_num);
    //func();
    if(modal_model === null)
        modal_model = new MODAL_MODEL();
  
    modal_model.showModal(func);
   
}

function close_modal()
{
   //alert("Hello"); 
   document.getElementById("edited_part").innerHTML = 
                "<div id='summary'></div><table id='images_space'></table>";
        
   document.getElementById("modal_space").style["display"] = "none";
   
}


