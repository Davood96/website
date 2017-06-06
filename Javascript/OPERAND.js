/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

OPERAND = function(value)
{
    this.value = value;
    this.used = false;
    
    this.setUsed = function(bool)
    {
        this.used = bool;
    };
    
    this.toString = function()
    {
        return this.value.toString();
    };
};
