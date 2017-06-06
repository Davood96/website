/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


BST_NODE = function(key, item)
{
    this.left = null;
    this.right = null;
    this.parent = null;
    
    this.key = key;
    this.item = item;
};

BST = function(root)
{
    this.count = 0;
    this.root = root;
    
    this.insertRec = function(node, curr_root)
    {
        if(curr_root === null)
            curr_root = node;
        else if(node.key > curr_root.key){
            curr_root.right = this.insertRec(node, curr_root.right);
            curr_root.right.parent = curr_root;}
        else{
            curr_root.left = this.insertRec(node, curr_root.left);
            curr_root.left.parent = curr_root;
            }
        return curr_root;
    };
    
    this.insert = function(node)
    {
      if(this.root === null)
          this.root = node;
      else
          this.root = this.insertRec(node, this.root);  
    };
    
    this.out = function()
    {
        var str = "";
        return this.outRec(str, this.root);
    };
    
    this.outRec = function(str, curr_root)
    {
        if(curr_root !== null)
        {   
            str = str + curr_root.item.toString() + " ";
            str = this.outRec(str, curr_root.left);
            str = this.outRec(str, curr_root.right);
            
        }
        return str;
    };    
};