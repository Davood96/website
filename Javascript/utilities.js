/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MaxHeap = function(capacity)
{
    this.capacity = capacity;
    this.count = 0;
    this.imp = new ArrayBuffer(capacity);
    
    this.upHeap = function(startIndex)
    {
       //Base case
       if(startIndex === 0)
       {
           return;
       }
       
       //Recursive Case
       var parent = Math.floor(startIndex / 2);
       if (startIndex % 2 === 0)
           parent -= 1;
       //alert(parent);
       if (this.priority(this.imp[startIndex]) > this.priority(this.imp[parent]))
       {
           //alert("Hi");
           var tmp = this.imp[startIndex];
           this.imp[startIndex] = this.imp[parent];
           this.imp[parent] = tmp;
           this.upHeap(parent);
       }
    };
    
    this.downHeap = function(startIndex)
    {
        //Base Case
        if(2 * startIndex > this.count)
        {
            return;
        }
       
        //Recursive Case
        var child1 = 2 * startIndex;
        var child2 = 2 * startIndex + 1;
        var largest_child = 
                this.priority(this.imp[child1]) > this.priority(this.imp[child2]) ? child1 : child2;
        
        if(this.priority(this.imp[startIndex]) < this.priority(this.imp[largest_child]))
        {
            var tmp = this.imp[startIndex];
            this.imp[startIndex] = this.imp[largest_child];
            this.imp[largest_child] = tmp;
            this.downHeap(largest_child);
        }
    };
    
    this.removeMax = function()
    {
        var result = this.imp[0];
        this.imp[0] = this.imp[this.count - 1];
        this.count -= 1;
        this.downHeap(0);
        return result;
    };
    
    
    this.insert = function(element)
    {
        this.imp[this.count] = element;
        this.upHeap(this.count);
        this.count += 1;
    };
    
    
    this.priority = function(element)
    {
        //alert(element.key.toString());
        return element.key;
    };
    
    this.out = function()
    {
        var str = "";
        for (i = 0; i < this.count; i++)
            str = str + this.imp[i].item.toString() + " ";
        return str;
    };
};

MinHeap = function(capacity)
{
    this.capacity = capacity;
    this.count = 0;
    this.imp = new ArrayBuffer(capacity);
    
    this.upHeap = function(startIndex)
    {
       //Base case
       if(startIndex === 0)
       {
           return;
       }
       
       //Recursive Case
       var parent = Math.floor(startIndex / 2);
       if (startIndex % 2 === 0)
           parent -= 1;
       //alert(parent);
       if (this.priority(this.imp[startIndex]) < this.priority(this.imp[parent]))
       {
           //alert("Hi");
           var tmp = this.imp[startIndex];
           this.imp[startIndex] = this.imp[parent];
           this.imp[parent] = tmp;
           this.upHeap(parent);
       }
    };
    
    this.downHeap = function(startIndex)
    {
        //Base Case
        if(2 * startIndex > this.count)
        {
            return;
        }
       
        //Recursive Case
        var child1 = 2 * startIndex;
        var child2 = 2 * startIndex + 1;
        var smallest_child = 
                this.priority(this.imp[child1]) < this.priority(this.imp[child2]) ? child1 : child2;
        
        if(this.priority(this.imp[startIndex]) > this.priority(this.imp[smallest_child]))
        {
            var tmp = this.imp[startIndex];
            this.imp[startIndex] = this.imp[smallest_child];
            this.imp[smallest_child] = tmp;
            this.downHeap(smallest_child);
        }
    };
    
    this.removeMin = function()
    {
        var result = this.imp[0];
        this.imp[0] = this.imp[this.count - 1];
        this.count -= 1;
        this.downHeap(0);
        return result;
    };
    
    
    this.insert = function(element)
    {
        this.imp[this.count] = element;
        this.upHeap(this.count);
        this.count += 1;
    };
    
    
    this.priority = function(element)
    {
        //alert(element.key.toString());
        return element.key;
    };
    
    this.out = function()
    {
        var str = "";
        for (i = 0; i < this.count; i++)
            str = str + this.imp[i].item.toString() + " ";
        return str;
    };
};

function reveresPost(curr_root, values, queue)
{
    if(curr_root.right !== null)
        reveresPost(curr_root.right, values, queue);
    
    var operator = curr_root.item;
    var operand_1 = values[operator.num1];
    var operand_2 = values[operator.num2];

    //alert("Curr node operator: " + operator.toString());

    if(!operand_1.used){
        queue.enqueue(operand_1.value);
        operand_1.setUsed(true);
    }

    if(!operand_2.used){
        queue.enqueue(operand_2.value);
        operand_2.setUsed(true);
    }
    queue.enqueue(operator);
    
    if(curr_root.left !== null)
        reveresPost(curr_root.left, values, queue);
}

DEQUE = function(capacity)
{
    this.capacity = capacity;
    this.rear = -1;
    this.front = 0;
    this.count = 0;
    this.imp = new ArrayBuffer(this.capacity);
    
    this.enqueue = function(element)
    {
        if(this.count === this.capacity)
            throw new Error("Queue is full!");
        
        this.rear = (this.rear + 1) % this.capacity; 
        this.imp[this.rear] = element;
        this.count++;
    };
    
    this.dequeue = function()
    {
        if(this.count === 0)
            throw new Error("Queue is empty!");
        
        var element = this.imp[this.front];
        if(this.front !== this.rear)
            this.front = (this.front + 1) % this.capacity;
        this.count--;
        return element;
    };
    
    this.addToFront = function(element)
    {
        if(this.count === this.capacity)
            throw new Error("Queue is full!");
        
        this.front = (this.front - 1 + this.capacity) % this.capacity;
        this.imp[this.front] = element;
        this.count++;
    };
    
    this.moveToBack = function()
    {
        if(this.count > 1)
        {
            var prev_front = this.dequeue();
            this.enqueue(prev_front);
        }
        
    };
    
    this.frontOfLine = function()
    {
        return this.imp[this.front];
    };
    
    this.removeFromBack = function()
    {
        if(this.count === 0)
            throw new Error("Queue is empty!");
        
        var element = this.imp[this.rear];
        if(this.front !== this.rear)
            this.rear = (this.rear - 1 + this.capacity) % this.capacity;
        this.count--;
        return element;
    };
    
    this.out = function()
    {
       var str = "";
       var i;
       for(i = this.front; i !== this.rear; i = (i + 1) % this.capacity)
           str = str + this.imp[i].toString() + ", ";
       str = str + this.imp[i].toString();
       return str;
    };
};


