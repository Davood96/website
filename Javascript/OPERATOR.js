/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function OPERATOR(symbol, num1, num2)
{
    this.symbol = symbol;
    this.num1 = num1;
    this.num2 = num2;
    this.value = 0;
}
OPERATOR.prototype.toString = function()
{
    return this.symbol;
};
OPERATOR.prototype.calculate = function()
{
    throw new Error("This function is not defined");
};

function PLUS(num1, num2, precedence)
{
    OPERATOR.call(this, "+", num1, num2);
    this.precedence = precedence;
}
PLUS.prototype = Object.create(OPERATOR.prototype);
PLUS.prototype.constructor = OPERATOR;
PLUS.prototype.calculate = function()
{
    //alert("Addition");
    this.value = this.num1.value + this.num2.value;
    return this.value;
};

function POSITIVE(num, precedence)
{
    PLUS.call(this, new OPERAND(0), num, precedence);
    this.precedence = precedence + 2;
};
POSITIVE.prototype = Object.create(PLUS.prototype);
POSITIVE.prototype.constructor = PLUS;



function MULTIPLY(num1, num2, precedence)
{
    OPERATOR.call(this, "*", num1, num2);
    this.precedence = precedence + 1;
}
MULTIPLY.prototype = Object.create(OPERATOR.prototype);
MULTIPLY.prototype.constructor = OPERATOR;
MULTIPLY.prototype.calculate = function()
{
    this.value = this.num1.value * this.num2.value;
    return this.value;
};


function DIVIDE(num1, num2, precedence)
{
    OPERATOR.call(this, "/", num1, num2);
    this.precedence = precedence + 1;
}
DIVIDE.prototype = Object.create(OPERATOR.prototype);
DIVIDE.prototype.constructor = OPERATOR;
DIVIDE.prototype.calculate = function()
{
    this.value = this.num1.value / this.num2.value;
    return this.value;
};

function SUBTRACT(num1, num2, precedence)
{
    OPERATOR.call(this, "-", num1, num2);
    this.precedence = precedence;
}
SUBTRACT.prototype = Object.create(OPERATOR.prototype);
SUBTRACT.prototype.constructor = OPERATOR;
SUBTRACT.prototype.calculate = function()
{
    this.value = this.num1.value - this.num2.value;
    return this.value;
};

function NEGATIVE(num, precedence)
{
    SUBTRACT.call(this, new OPERAND(0), num, precedence);
    this.precedence = precedence + 2;
};
NEGATIVE.prototype = Object.create(SUBTRACT.prototype);
NEGATIVE.prototype.constructor = SUBTRACT;

function SIN(num1, num2, precedence)
{
    OPERATOR.call(this, "sin", num1, num2);
    this.precedence = precedence + 3;
}
SIN.prototype = Object.create(OPERATOR.prototype);
SIN.prototype.constructor = OPERATOR;
SIN.prototype.calculate = function()
{
    this.value = Math.sin(this.num2.value);
    return this.value;
};
function POWER(num1, num2, precedence)
{
    OPERATOR.call(this, "^", num1, num2);
    this.precedence = precedence + 4;
}
POWER.prototype = Object.create(OPERATOR.prototype);
POWER.prototype.constructor = OPERATOR;
POWER.prototype.calculate = function()
{
    this.value = Math.pow(this.num1.value, this.num2.value);
    return this.value;
};
