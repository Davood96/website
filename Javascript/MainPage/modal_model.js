/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

MODAL_MODEL = function(shutdown)
{
    this.close = shutdown;
};

MODAL_MODEL.prototype.showModal = function(modal_func)
{
    modal_func();
    document.getElementById('modal_space').style['display'] = 'block';
};
