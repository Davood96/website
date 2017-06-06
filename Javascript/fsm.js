/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


FSM = function()
{
    this.imp = new ArrayBuffer(3);
    this.imp[0] = new S1();
    this.imp[1] = new S2();
    this.imp[2] = new S3();

    //0 = keypress
    //1 = equals
    
    this.transitions = new ArrayBuffer(3);
    for(i = 0; i < 3; i++)
        this.transitions[i] = new ArrayBuffer(2);
    
    this.transitions[0][0] = 0;
    this.transitions[0][1] = 1;
    
    this.transitions[1][0] = 2;
    this.transitions[1][1] = 1;
    
    this.transitions[2][0] = 0;
    this.transitions[2][1] = 1;
    
    
    this.currState = 0;
};

FSM.prototype.transition = function(event)
{
    var next_state = this.transitions[this.currState][event.category];
    this.currState = next_state;
};

FSM.prototype.action = function(key, event)
{
    return this.imp[this.currState].update(key, event);
};

FSM.prototype.unaction = function(event)
{
     this.currState = event.prev_state;
     return event.undo();
};