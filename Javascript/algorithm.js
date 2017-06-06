/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function algorithm(A)
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
        
        if(is_op(curr_chr))
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
                right_greedy = sign ? 6 : 0;
                sign = curr_chr === '+' || curr_chr === '-';
                result.insertNode(new NODE(null, new OPERAND(0), null, null));
            }
            
            //alert("Curr op : " + curr_chr);
            //
            
            var element = sign ? new_sign(curr_chr, factor + right_greedy) : 
                                    new_operator(curr_chr, t, factor);
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
}

function is_op(chr)
{
    return chr === '+' || chr === '*' || chr === '-' || chr === '/' || chr === 's' || chr === '^';
}

function new_sign(operator_symbol, precedence_factor)
{
    var result = null;
    switch(operator_symbol)
    {
        case "+":
           // alert("POS");
            result = new POSITIVE(new OPERAND(0), precedence_factor);
            break;
        case "-":
           // alert("NEG");
            result = new NEGATIVE(new OPERAND(0), precedence_factor);
            break;
    }
    return result;
}

function new_operator(operator_symbol, position, precedence_factor)
{
    var result = null;
    switch (operator_symbol) 
    {
        case "+":
            result = new PLUS(position - 1, position + 1, precedence_factor);
            break;
            
        case "*":
            result = new MULTIPLY(position - 1, position + 1, precedence_factor);
            break
            
        case "/":
            result = new DIVIDE(position - 1, position + 1, precedence_factor);
            break;
            
        case "-":
            result = new SUBTRACT(position - 1, position + 1, precedence_factor);
            break;    
            
        case "s":
            result = new SIN(position + 1, position + 1, precedence_factor);
            break;
            
        case "^":
            //alert("POWER");
            result = new POWER(0, 0, precedence_factor);
            break;
    }
    return result;
}

function postEvaluate(curr_root, values)
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
    
}

function test(str)
{
    var A = str;
    var ret = algorithm(A);
    var values = ret[0];
    var tree = ret[1];
    var curr_node = tree.root;
    var result = postEvaluate(curr_node, values);
    return result;  
}
