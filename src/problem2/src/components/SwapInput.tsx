import debounce from "@/helpers/debounce";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { cn } from "@/lib/utils";
import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
} from "react";
import { useFormContext } from "react-hook-form";
import SelectTokens from "./SelectTokens";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

type SwapInputProps = {
  title: string;
  tokens: TokenItem[];
  tokenTypeName: string;
  tokenValueName: string;
  price: string;
  isLoadingPrice: boolean;
  setCalcField: Dispatch<SetStateAction<"swap" | "get" | null>>;
  onSwap: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const SwapInput = (props: SwapInputProps) => {
  const {
    isLoadingPrice,
    price,
    title,
    tokens,
    tokenTypeName,
    tokenValueName,
    setCalcField,
    onSwap,
    ...inputProps
  } = props;

  const { className, ...restInputProps } = inputProps;

  const form = useFormContext();

  const { refetch } = useGetTokenPrice();

  const handleSwapDebounce = useCallback(
    debounce((e) => {
      const target = (e as ChangeEvent<HTMLInputElement>).target;

      refetch().then(() => {
        onSwap(target.value);
        target.focus();
      });
    }, 500),
    [onSwap],
  );

  return (
    <div className="rounded-2xl p-6 bg-[#1E2728] w-[500px] max-w-full">
      <div className="flex items-center justify-between">
        <p className="text-bold text-primary text-xl">{title}</p>

        <FormField
          name={tokenTypeName}
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormControl>
                <SelectTokens
                  tokens={tokens}
                  {...restField}
                  onChange={(value) => {
                    onChange(value);
                    refetch().then(() => {
                      onSwap(form.watch(tokenValueName));
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={tokenValueName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className={cn("text-3xl text-background mt-4 ", className, {
                  "opacity-50 pointer-events-none": restInputProps.disabled,
                })}
                {...field}
                {...restInputProps}
                onChange={(e) => {
                  const { value } = e.target;

                  const firstIndexDot = value.indexOf(".");

                  if (
                    firstIndexDot !== -1 &&
                    value.indexOf(".", firstIndexDot + 1) !== -1
                  ) {
                    return;
                  }

                  form.clearErrors();

                  field.onChange(e.target.value.replace(/[^\d\.]/g, ""));
                  setCalcField(
                    tokenValueName.startsWith("get") ? "swap" : "get",
                  );
                  handleSwapDebounce(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isLoadingPrice ? (
        <Skeleton className="w-1/2 h-5 rounded-full my-[2px]" />
      ) : (
        <div className="flex items-center gap-2 text-background">
          <p>Pricing:</p>
          <p className="text-base text-semibold">{price}</p>
        </div>
      )}
    </div>
  );
};

export default SwapInput;
