export function zeroizeFloat32Array(a: Float32Array | number[] | null) {
  if (!a) return;
  if (a instanceof Float32Array) {
    for (let i = 0; i < a.length; i++) a[i] = 0;
  } else if (Array.isArray(a)) {
    for (let i = 0; i < a.length; i++) a[i] = 0;
  }
}
