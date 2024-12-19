export function add(firstOperand: number, secondOperand: number): number {
  return firstOperand + secondOperand;
}

export function sub(firstOperand: number, secondOperand: number): number {
  return firstOperand - secondOperand;
}

export function mul(firstOperand: number, secondOperand: number): number {
  return firstOperand * secondOperand;
}

export function div(firstOperand: number, secondOperand: number): number | null {
  return secondOperand === 0 ? null : Number((firstOperand / secondOperand).toFixed(4));
}
