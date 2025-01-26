const debounce = (fn: (...args: unknown[]) => void, ms: number) => {
  let timerId: NodeJS.Timeout | null = null;

  return (...args: unknown[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => fn(...args), ms);
  };
};

export default debounce;
