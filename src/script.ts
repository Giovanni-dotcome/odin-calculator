// operations:
//  - add
function add(frtOp: number, sndOp: number): number {
  return frtOp + sndOp;
}

//  - subtract
function sub(frtOp: number, sndOp: number): number {
  return frtOp - sndOp;
}

//  - multiply
function mul(frtOp: number, sndOp: number): number {
  return frtOp * sndOp;
}

//  - divide
function div(frtOp: number, sndOp: number): number | null {
  return sndOp === 0 ? null :frtOp / sndOp;
}

// testing
console.log(div(1, 0));
