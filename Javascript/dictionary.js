/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function DICTIONARY()
{
    this.imp = new Object();
    this.count = 0;
}
DICTIONARY.prototype.addPair = function(key, value)
{
    this.imp[key] = value;
    this.count++;
};
DICTIONARY.prototype.getValue = function(key)
{
    return this.imp[key];
};
