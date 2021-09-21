export default function debounce (func: () => void, time: number): (e: unknown) => void {
  const actualTime = time || 100;
  let timer: number | null;

  return (e) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, actualTime, e);
  };
}

export function getRandomArbitrary (min: number, max: number, round = false): number {
  let out = 0;

  out = Math.random() * (max - min) + min;
  if (round) out = Math.round(out);

  return out;
}
