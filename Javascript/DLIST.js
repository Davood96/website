/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

NODE = function(key, item, prev, next)
{
    this.key = key;
    this.item = item;
    
    this.prev = prev;
    this.next = next;
};

DLIST = function()
{
    this.head = new NODE(null, null, null, null);
    this.tail = new NODE(null, null, null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    
    this.count = 0;
    
    this.insertElement = function(element)
    {
        var new_node = new NODE(null, element, null, null);
        this.insertNode(new_node);
    };
    
    this.insertNode = function(new_node)
    {
        var prev_last = this.tail.prev;
       // alert(prev_last.item);
        prev_last.next = new_node;
        new_node.prev = prev_last;
        new_node.next = this.tail;
        this.tail.prev = new_node;
        //alert(this.head.next.item);
        this.count++;
    };
    
    this.removeNode = function(node)
    {
        var prev = node.prev;
        var next = node.next;
        prev.next = next;
        next.prev = prev;
        node = null;
        this.count--;
    };
    
    this.insertAfter = function(node, element)
    {
        var new_node = new NODE(null, element, null, null);
        var next = node.next;
        new_node.prev = node;
        node.next = new_node;
        new_node.next = next;
        next.prev = new_node;
    };
    
    this.newTail = function(new_position)
    {
        if(new_position !== this.tail)
        {
            new_position.item = null;
            new_position.next = null;
            this.tail = new_position;
        }
    };
    
    this.out = function()
    {
       var str = "";
       var curr_node = this.head.next;
       while(curr_node !== this.tail)
       {
           //alert(curr_node.item);
           str = str + " " + curr_node.item.toString();
           curr_node = curr_node.next;
       };
       return str;
    };
};

