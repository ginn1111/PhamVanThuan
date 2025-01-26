import useTokenPrice from "@/hooks/useTokenPrice";
import useTokens from "@/hooks/useTokens";
import SwapIcon from "@/icons/SwapIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";
import SwapInput from "./SwapInput";
import TokenLabel from "./TokenLabel";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const schema = zod
  .object({
    getTokenValue: zod.string(),
    getTokenType: zod.string(),
    swapTokenType: zod.string(),
    swapTokenValue: zod.string(),
  })
  .refine(
    (values) => {
      return !!values.getTokenValue || values.swapTokenValue;
    },
    {
      message: "Enter a number",
      path: ["swapTokenValue"],
    },
  );

const SwapForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      getTokenType: "ETH",
      swapTokenType: "BUSD",
      swapTokenValue: "",
      getTokenValue: "",
    },
  });

  const [calcField, setCalcField] = useState<"swap" | "get" | null>(null);

  const formValue = form.watch();

  const { hasPriceTokens: tokens, isFetching: isFetchingPrice } = useTokens();

  const swapPrice = useTokenPrice({ tokenType: formValue.swapTokenType });
  const getPrice = useTokenPrice({ tokenType: formValue.getTokenType });

  const swapTokens = tokens
    .filter((token) => token !== formValue.getTokenType)
    .map((tokenName) => ({
      value: tokenName,
      label: <TokenLabel tokenName={tokenName} />,
    }));

  const getTokens = tokens
    .filter((token) => token !== formValue.swapTokenType)
    .map((tokenName) => ({
      value: tokenName,
      label: <TokenLabel tokenName={tokenName} />,
    }));

  const handleSwap = (
    name: "swapTokenValue" | "getTokenValue",
    prices: (string | undefined)[],
  ) => {
    if (prices.every((price) => !Number.isNaN(Number(price)))) {
      const result =
        (Number(prices[0]) * Number(prices[1])) / Number(prices[2]);

      form.setValue(name, result > 0 ? result.toFixed(18) : "0.00");
    }
  };

  const getFnFactory = useCallback(
    (value: string) => {
      handleSwap("swapTokenValue", [value, getPrice, swapPrice]);
    },
    [getPrice, swapPrice],
  );
  const swapFnFactory = useCallback(
    (value: string) => {
      handleSwap("getTokenValue", [value, swapPrice, getPrice]);
    },
    [getPrice, swapPrice],
  );

  const handleSubmit: SubmitHandler<zod.infer<typeof schema>> = (values) => {
    toast("Swap successfully!");
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="relative flex flex-col gap-4 z-10">
          <SwapInput
            isLoadingPrice={isFetchingPrice}
            price={swapPrice ?? "0"}
            title="Swap"
            tokens={swapTokens}
            tokenTypeName="swapTokenType"
            tokenValueName="swapTokenValue"
            placeholder="0.00"
            setCalcField={setCalcField}
            disabled={
              !formValue.swapTokenType ||
              (isFetchingPrice && calcField === "swap")
            }
            onSwap={swapFnFactory}
          />
          <div
            onClick={() => {
              const {
                swapTokenType,
                getTokenType,
                swapTokenValue,
                getTokenValue,
              } = form.getValues();
              form.setValue("swapTokenType", getTokenType);
              form.setValue("swapTokenValue", getTokenValue);
              form.setValue("getTokenType", swapTokenType);
              form.setValue("getTokenValue", swapTokenValue);
            }}
            role="button"
            className="absolute active:scale-90 left-1/2 -translate-x-1/2 w-[50px] h-[50px] top-1/2 -translate-y-1/2 rounded-full z-10 grid place-items-center text-primary bg-[#1E2728]/50 border-primary border hover:rotate-180 transition-all duration-300 ease-in-out shadow-[inset_0_0_5px_5px_transparent] hover:shadow-primary/50 after:absolute after:w-[120%] after:h-[120%] after:shadow-[0_0_0_6px_#262626] after:z-[-1] after:rounded-full"
          >
            <SwapIcon />
          </div>
          <SwapInput
            onSwap={getFnFactory}
            isLoadingPrice={isFetchingPrice}
            price={getPrice ?? "0"}
            title="Get"
            tokens={getTokens}
            setCalcField={setCalcField}
            disabled={
              !formValue.swapTokenType ||
              (isFetchingPrice && calcField === "get")
            }
            tokenTypeName="getTokenType"
            tokenValueName="getTokenValue"
            placeholder="0.00"
          />
        </div>
        <Button
          disabled={isFetchingPrice}
          className="w-full uppercase mt-6 text-background group overflow-hidden py-4 text-base transition duration-300 relative z-10 !bg-transparent border border-primary"
          type="submit"
        >
          <div className="absolute inset-0 bg-primary z-[-1] scale-y-0 group-hover:scale-y-100 transition-all duration-300 origin-bottom" />
          confirm swap
        </Button>
      </form>
    </Form>
  );
};

export default SwapForm;
