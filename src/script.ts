import {add, sub, mul, div} from './math.js';

let firstOperand: string = "";
let operations: string[] = ["+", "-", "×", "÷"];
let secondOperand: string = "";
let operation: string;
let isFirstOperand: Boolean = true;

const buttons = document.querySelectorAll('.btn');
const display = document.querySelector(".display");

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent && operations.includes(button.textContent)) {
      isFirstOperand = !isFirstOperand;
      operation = button.textContent;
    }
    if (button.textContent && !isNaN(Number(button.textContent))) {
      if (isFirstOperand) {
        firstOperand += button.textContent;
        if (display) display.textContent = firstOperand;
      }
      else {
        secondOperand += button.textContent;
        if (display) display.textContent = secondOperand;
      }
    }
    if (button.textContent && button.textContent === "=") {
      if (display) display.textContent = operate(operation, Number(firstOperand), Number(secondOperand))?.toString() || "";
      firstOperand = display?.textContent || "";
      secondOperand = "";
      isFirstOperand = !isFirstOperand;
    }
    if (button.textContent && button.textContent === "A/C") {
      if (display) display.textContent = "";
      firstOperand = "";
      secondOperand = "";
    }
    else {
      console.log(`Operand: ${operation}, First: ${Number(firstOperand)}, Second: ${Number(secondOperand)}, isFirst: ${isFirstOperand}`);
    }
  });
});

function operate(operationType: string, firstNumber: number, secondNumber: number): number | null {
  switch (operationType) {
    case '+':
      return add(firstNumber, secondNumber);

    case '-':
      return sub(firstNumber, secondNumber);

    case '×':
      return mul(firstNumber, secondNumber);

    case '÷':
      return div(firstNumber, secondNumber);

    default:
      return null;
  }
}

