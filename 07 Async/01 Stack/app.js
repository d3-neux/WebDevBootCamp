const multiply = (x,y) => x * y;

const square = x => multiply(x,x);

const isRightTriangle = (a,b,c) => square(a) + square(b) === square(c);


console.log("before");
isRightTriangle(2,3,4);

console.log("done");