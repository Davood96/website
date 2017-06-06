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

