export function add(frtOp: number, sndOp: number): number {
  return frtOp + sndOp;
}

export function sub(frtOp: number, sndOp: number): number {
  return frtOp - sndOp;
}

export function mul(frtOp: number, sndOp: number): number {
  return frtOp * sndOp;
}

export function div(frtOp: number, sndOp: number): number | null {
  return sndOp === 0 ? null :frtOp / sndOp;
}
