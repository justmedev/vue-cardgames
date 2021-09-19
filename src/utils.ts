export default function debounce (func: () => void, time: number): (e: unknown) => void {
  const actualTime = time || 100;
  let timer: number | null;

  return (e) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, actualTime, e);
  };
}
