/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

STATE = function(){};
STATE.prototype.update = function(key, event)
{
    //alert(event.prev_field);
    return  [event.prev_field + key, event.prev_history]; 
    //return this.screen_text.innerHTML;
};

S1 = function()
{
    STATE.call(this);
};
S1.prototype = Object.create(STATE.prototype);
S1.prototype.constructor = STATE;

S2 = function()
{
    STATE.call(this);
    this.dictionary = new DICTIONARY();
    this.dictionary.addPair("+", this.createPLUS);
    this.dictionary.addPair("-", this.createSUBTRACT);
    this.dictionary.addPair("*", this.createMULT);
    this.dictionary.addPair("/", this.createDIV);
    this.dictionary.addPair("s", this.createSIN);
    this.dictionary.addPair("^", this.createPOW);
};

S2.prototype = Object.create(STATE.prototype);
S2.prototype.constructor = STATE;
S2.prototype.update = function(key, event)
{
    var answer = this.test(event.prev_field);
    return[answer, event.prev_field + " = "]; 
};
S2.prototype.createPLUS = function(sign, factor, right_greedy)
{
    alert("Create a new PLUS!");
    var result = sign ? new POSITIVE(new OPERAND(0), factor + right_greedy) : 
               new PLUS(0, 0, factor);
    return result;
    //return new PLUS(0, 0, precedence_factor);  
};
S2.prototype.createSUBTRACT = function(sign, factor, right_greedy)
{
    alert("Create a new SUBTRACT!");
    var result = sign ? new NEGATIVE(new OPERAND(0), factor + right_greedy) : 
               new SUBTRACT(0, 0, factor);
    return result;
    //return new PLUS(0, 0, precedence_factor);  
};
S2.prototype.createMULT = function(sign, factor, right_greedy)
{
    alert("Create a new MULTIPLY!");
    var result = new MULTIPLY(0, 0, factor);
    return result;
    //return new PLUS(0, 0, precedence_factor);  
};
S2.prototype.createDIV = function(sign, factor, right_greedy)
{
    alert("Create a new DIVIDE!");
    var result = new DIVIDE(0, 0, factor);
    return result;
    //return new PLUS(0, 0, precedence_factor);  
};
S2.prototype.createSIN = function(sign, factor, right_greedy)
{
    alert("Create a new SIN!");
    var result = new SIN(0, 0, factor);
    return result;
    //return new PLUS(0, 0, precedence_factor);  
};
S2.prototype.createPOW = function(sign, factor, right_greedy)
{
    alert("Create a new POWER!");
    var result = new POWER(0, 0, factor);
    return result;
    //return new PLUS(0, 0, precedence_factor);  
};
S2.prototype.is_op = function(chr)
{
    return this.dictionary.getValue(chr) !== undefined;
};
S2.prototype.postEvaluate = function(curr_root, values)
{
    var operand_l, operand_r;

    if(curr_root.right !== null)
        postEvaluate(curr_root.right, values);
     
    var node = curr_root.item;
    operand_l = node.prev.item;
    operand_r = node.next.item;
  
    node.item.num1 = operand_l;
    node.item.num2 = operand_r;
   
    var result = node.item.calculate();
    var replacement_operand = new OPERAND(result);
    
    //alert(operand_l.value + " " + node.item.toString() + " " + operand_r.value + " = " + result);
    //alert(node.item.precedence);
    values.removeNode(node.prev);
    values.removeNode(node.next);
   
    node.item = replacement_operand;
    if(curr_root.left !== null)
        return postEvaluate(curr_root.left, values);
    
    return result;
};

S2.prototype.new_operator = function(curr_chr, sign, factor, right_greedy)
{
    return this.dictionary.getValue(curr_chr)(sign, factor, right_greedy);
};

S2.prototype.algorithm = function(A)
{
    var l = 0;
    var factor = 1;
    var sign = false;
    var right_greedy = 0;
    while (A.charCodeAt(l) > 57 || A.charCodeAt(l) < 48)
        l++;
    var t = 0;
    var result = new DLIST();
    var precedence_tree = new BST(null);
    for(i = 0; i < A.length; i++)
    {
        var curr_chr = A.charAt(i);
        if(curr_chr === ")")
        {
            //ToDo
            factor -= 6;
            //i++;
        }    
        else if(curr_chr === "(")
        {
            //ToDo
            factor += 6;
            //i++;
        }
        
        if(this.is_op(curr_chr))
        {
            var r = i;
            //alert("Factor, operator: " + factor + " " + curr_chr);
            if(r > l)
            {
                while (A.charCodeAt(r-1) > 57 || A.charCodeAt(r-1) < 48)
                    r--;
                //alert("Number : " + A.substring(l, r));
                var element = new OPERAND(parseFloat(A.substring(l, r)));
                var new_node = new NODE(null, element, null, null);
                result.insertNode(new_node);
                sign = false;
            }
            else
            {
                //alert("Sign: " + curr_chr);
                right_greedy = sign ? 5 : 0;
                sign = curr_chr === '+' || curr_chr === '-';
                result.insertNode(new NODE(null, new OPERAND(0), null, null));
            }
            
            //alert("Curr op : " + curr_chr);
            //
            
            var element = this.new_operator(curr_chr, sign, factor, right_greedy);//sign ? new_sign(curr_chr, factor + right_greedy) : 
                                    //new_operator(curr_chr, t, factor);
            //if(curr_chr === 's')
                //result.insertNode(new NODE(null, new OPERAND(0), null, null));
           // alert(result[t++]);
            var new_node = new NODE(null, element, null, null);
            result.insertNode(new_node);
            //alert(result[t].precedence);
            precedence_tree.insert(new BST_NODE(new_node.item.precedence, new_node));
            t += 1;
            l = i + 1;
            while (l < A.length && (A.charCodeAt(l) > 57 || A.charCodeAt(l) < 48))
                l++;
            //i++;
        }
    }
    var r = A.length;
    while (A.charCodeAt(r-1) > 57 || A.charCodeAt(r-1) < 48)
        r--;
    var element = new OPERAND(parseFloat(A.substring(l, r)));
    var new_node = new NODE(null, element, null, null);
    result.insertNode(new_node);
    return [result, precedence_tree, result.count];
};
S2.prototype.test = function(str)
{
    var A = str;
    var ret = this.algorithm(A);
    var values = ret[0];
    var tree = ret[1];
    var curr_node = tree.root;
    var result = this.postEvaluate(curr_node, values);
    return result;   
};

S3 = function()
{
    STATE.call(this);
};
S3.prototype = Object.create(STATE.prototype);
S3.prototype.constructor = STATE;
S3.prototype.update = function(key, event)
{
    return [event.prev_field + key, "Prev: " + event.prev_history + event.prev_field];
};
