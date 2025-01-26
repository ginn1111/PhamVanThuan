import { getTokenPriceQK } from "@/constants/queryKeys";
import { getTokenPrice } from "@/lib/services/tokenPrice";
import { useQuery } from "react-query";

const useGetTokenPrice = () => {
  const useQueryReturn = useQuery({
    queryFn: getTokenPrice,
    queryKey: getTokenPriceQK(),
  });

  return {
    ...useQueryReturn,
    tokenPriceList: useQueryReturn.data ?? [],
  };
};

export default useGetTokenPrice;
