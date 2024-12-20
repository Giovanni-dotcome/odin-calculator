import {add, sub, mul, div} from './math.js';

const enum calculatorState {
  STARTING = "starting",
  FIRST_OPERAND = "firstOperand",
  OPERATION = "operation",
  SECOND_OPERAND = "secondOperand",
}

let state: calculatorState = calculatorState.STARTING;
let firstOperand: string = "";
let secondOperand: string = "";
let operation: string = "";
let error: boolean = false;
let operations: string[] = ["+", "-", "×", "÷"];

const buttons = document.querySelectorAll('.btn');
const display = document.querySelector(".display");

function handleInput(input: string) {
  const InputHandlers: Record<string, () => void> = {
    "=": handleEqualsInput,
    "A/C": resetCalculator,
    "+/-": handleChangeSignInput,
    "C": handleBackspaceInput,
    ".": handleDotInput,
  }

  if (isNumber(input))
    handleNumberInput(input);
  if (operations.includes(input))
    handleOperationInput(input);
  if (InputHandlers[input])
    InputHandlers[input]();

  updateDisplay();
  console.log(state);
}

function handleBackspaceInput() {
  switch (state) {
    case calculatorState.FIRST_OPERAND:
      firstOperand = firstOperand.slice(0, -1);
      break;
    case calculatorState.SECOND_OPERAND:
      secondOperand = secondOperand.slice(0, -1);
      break;
    case calculatorState.OPERATION:
      operation = "";
      state = calculatorState.FIRST_OPERAND;
  }
}

function handleDotInput() {
  if (display?.textContent?.includes(".")) return;

  switch (state) {
    case calculatorState.STARTING:
      firstOperand = "0.";
      state = calculatorState.FIRST_OPERAND;
      break;
    case calculatorState.FIRST_OPERAND:
      firstOperand += ".";
      break;
    case calculatorState.OPERATION:
      secondOperand = "0.";
      state = calculatorState.SECOND_OPERAND;
      break;
    case calculatorState.SECOND_OPERAND:
      secondOperand += ".";
      break;
  }
}

function handleChangeSignInput() {
  if (state === calculatorState.FIRST_OPERAND)
    firstOperand = (-Number(firstOperand)).toString();
  if (state === calculatorState.SECOND_OPERAND)
    secondOperand = (-Number(secondOperand)).toString();
}

function handleNumberInput(input: string) {
  if ((state === calculatorState.FIRST_OPERAND || state === calculatorState.SECOND_OPERAND) && (display?.textContent?.split(".")[0].length || 0) >= 6) return;
  if ((state === calculatorState.FIRST_OPERAND || state === calculatorState.SECOND_OPERAND) && (display?.textContent?.includes(".") && display?.textContent?.split(".")[1].length || 0) >= 4) return;
  if (state === calculatorState.FIRST_OPERAND || state === calculatorState.STARTING && input !== "0") {
    firstOperand += input;
    state = calculatorState.FIRST_OPERAND
  }
  if (state === calculatorState.OPERATION || state === calculatorState.SECOND_OPERAND)
    secondOperand += input;
  if (state === calculatorState.OPERATION)
    state = calculatorState.SECOND_OPERAND;
  if (operation === "=")
    firstOperand = input;
}

function handleOperationInput(input: string) {
  if (display?.textContent?.slice(-1) === ".") return;
  if (state === calculatorState.FIRST_OPERAND) {
    operation = input;
    state = calculatorState.OPERATION;
  }
  if (state === calculatorState.OPERATION)
    operation = input;
  if (state === calculatorState.SECOND_OPERAND) {
    firstOperand = operate(operation, Number(firstOperand), Number(secondOperand))?.toString() || "";
    secondOperand = "";
    operation = input;
    state = calculatorState.OPERATION;
  }
}

function handleEqualsInput() {
  if (display?.textContent?.slice(-1) === ".") return;
  if (state === calculatorState.SECOND_OPERAND) {
    firstOperand = operate(operation, Number(firstOperand), Number(secondOperand))?.toString() || "";
    secondOperand = "";
    operation = "="
    state = calculatorState.FIRST_OPERAND;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.textContent || ""));
})

function isNumber(input: string) {
  return !isNaN(Number(input));
}

function updateDisplay() {
  if (!display) return;
  if (state === calculatorState.SECOND_OPERAND)
    display.textContent = secondOperand;
  else
    display.textContent = firstOperand;
  if (error)
    display.textContent = "Error";
}

function resetCalculator() {
  error = false;
  firstOperand = "";
  secondOperand = "";
  operation = "";
  state = calculatorState.STARTING;
}

function operate(operationType: string, firstNumber: number, secondNumber: number): number | null {
  switch (operationType) {
    case '+':
      return add(firstNumber, secondNumber);

    case '-':
      return sub(firstNumber, secondNumber);

    case '×':
      return mul(firstNumber, secondNumber);

    case '÷':
      const divResult = div(firstNumber, secondNumber);
      if (divResult === null)
        error = true;
      return divResult;

    default:
      return null;
  }
}

