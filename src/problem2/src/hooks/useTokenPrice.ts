import useGetTokenPrice from "./useGetTokenPrice";

type UseTokenPriceProps = {
  tokenType: string;
};

const useTokenPrice = (props: UseTokenPriceProps) => {
  const { tokenType } = props;
  const { tokenPriceList } = useGetTokenPrice();

  const price = tokenPriceList.find(
    (price) => price.currency === tokenType,
  )?.price;

  return price;
};

export default useTokenPrice;
