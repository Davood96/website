/* 
 * This module represents the main
 * page/view controller
 * @author: Davood Anbarnam
 * 
 */

/**
 * The business logic of the navigation bar,
 * encapsulated in class NAV_MODEL
 * @type NAV_MODEL
 */
var nav_model = null;

/**
 * 
 * @param {INTEGER} id - the selected navigation bar's id
 *
 */
function change(id)
{
    
    if(id !== nav_model.currBar)
    {
        //alert("IN");
        document.getElementById(nav_model.currBar).style["opacity"] = "1";
        document.getElementById(id).style["opacity"] = "0.5";
        nav_model.clickBar(id);
    }
       
}

/**
 *  Initialises page with beginning
 *  contents
 * 
 */
function initPage()
{
    nav_model = new NAV_MODEL();
    document.getElementById("0").style["opacity"] = "0.5";
    nav_model.clickBar("0");
}


var modal_model = null;
function open_modal(func, shtdown)
{
    //alert(project_num);
    //func();
    //alert(func);
    if(modal_model === null)
        modal_model = new MODAL_MODEL(shtdown);
    else
        modal_model.close = shtdown;
  
    modal_model.showModal(func);
   
}

function close_modal()
{
   //alert("Hello"); 
   /*if(calc_model !== null)  Quick-fix
        calc_model = null;*/

   modal_model.close();
   document.getElementById("edited_part").innerHTML = 
                "<div id='summary'></div><table id='images_space'></table>";
        
   document.getElementById("modal_space").style["display"] = "none";
   
}


