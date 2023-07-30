export function debounce<F extends (...params: any[]) => void>(
  fn: F,
  wait = 166,
) {
  let timeout: any;
  function debounced(...args: any) {
    const later = () => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
