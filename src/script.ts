import {add, sub, mul, div} from './math.js';

var firstNumber: number;
var secondNumber: number;
var operationType: string;


function operate(operationType: string, firstNumber: number, secondNumber: number) {
  switch (operationType) {
    case '+':
      add(firstNumber, secondNumber);
      break;

    case '-':
      sub(firstNumber, secondNumber);
      break;

    case '*':
      mul(firstNumber, secondNumber);
      break;

    case '/':
      div(firstNumber, secondNumber);
      break;

    default:
      break;
  }
}

// testing
console.log(operate('*', 1, 0));
