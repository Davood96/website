/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


EVENT = function(category)
{
    this.category = category;
};

EQUALS_EVENT = function(prev_history, prev_field, prev_state)
{  
  EVENT.call(this, 1);  
  this.prev_history = prev_history;
  this.prev_field = prev_field;
  this.prev_state = prev_state;
};
EQUALS_EVENT.prototype = Object.create(EVENT.prototype);
EQUALS_EVENT.prototype.constructor = EVENT;
EQUALS_EVENT.prototype.undo = function()
{
    return [this.prev_field, this.prev_history];
};

KEYPRESS_EVENT = function(prev_history, prev_field, prev_state)
{
  EVENT.call(this, 0);  
  this.prev_history = prev_history;
  this.prev_field = prev_field;
  this.prev_state = prev_state;
};
KEYPRESS_EVENT.prototype = Object.create(EVENT.prototype);
KEYPRESS_EVENT.prototype.constructor = EVENT;
KEYPRESS_EVENT.prototype.undo = function()
{
    return [this.prev_field, this.prev_history];
};