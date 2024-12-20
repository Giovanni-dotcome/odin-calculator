function parseNumber(number: number): number {
  if (number >= 1_000_000)
    return Number(999_999.9999);
  return Number(number.toFixed(4));
}

export function add(firstOperand: number, secondOperand: number): number {
  return parseNumber(firstOperand + secondOperand);
}

export function sub(firstOperand: number, secondOperand: number): number {
  return parseNumber(firstOperand - secondOperand);
}

export function mul(firstOperand: number, secondOperand: number): number {
  return  parseNumber(firstOperand * secondOperand);
}

export function div(firstOperand: number, secondOperand: number): number | null {
  return secondOperand === 0 ? null : parseNumber(firstOperand / secondOperand);
}
