/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CALC_MODEL()
{
    this.fsm = new FSM();
    this.events = new DLIST();
    this.currEvent = this.events.head;
}
CALC_MODEL.prototype.registerModel = function(key, prev_history, prev_value)
{
   var new_event = key === '=' ? new EQUALS_EVENT(prev_history, prev_value, this.fsm.currState) : 
                             new KEYPRESS_EVENT(prev_history, prev_value, this.fsm.currState);  
    this.events.insertAfter(this.currEvent, new_event);
    this.currEvent = this.currEvent.next;
    this.events.newTail(this.currEvent.next);
    this.fsm.transition(new_event);
    return this.fsm.action(key, new_event);
};
CALC_MODEL.prototype.undoModel = function()
{   
    var result = this.fsm.unaction(this.currEvent.item);
    this.currEvent = this.currEvent.prev;
    return result;   
};
CALC_MODEL.prototype.isInitial = function()
{
    return this.currEvent === this.events.head;
};
