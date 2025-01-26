import { TokenNames } from "@/constants/tokens";
import useGetTokenPrice from "./useGetTokenPrice";

const useTokens = () => {
  const { tokenPriceList, ...rest } = useGetTokenPrice();

  const hasPriceTokens = Array.from(new Set(TokenNames)).filter((tokenName) =>
    tokenPriceList.find((price) => price.currency === tokenName),
  );

  return {
    hasPriceTokens,
    ...rest,
  };
};

export default useTokens;
