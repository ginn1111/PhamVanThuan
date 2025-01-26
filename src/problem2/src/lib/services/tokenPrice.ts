export const getTokenPrice = (): Promise<PricItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        fetch("https://interview.switcheo.com/prices.json").then((resp) =>
          resp.json(),
        ),
      );
    }, 1_000);
  });
};
