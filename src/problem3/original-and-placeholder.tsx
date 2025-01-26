interface WalletBalance {
  currency: string;
  amount: number;
}
// Should extends from `WalletBalance` interface
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Define `BoxProps` interface
interface Props extends BoxProps {

}
// redundant define type of props `props: Props`
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // using object instead of switch case statement and remove any type of 'blockchain' parameter
  // for more elegant
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    // we should break down the filter result, after that, use sort on it
    return balances.filter((balance: WalletBalance) => {
      // type `WalletBalance` does not have `blockchain` prop -> add to `WalletBalance` interface
		  const balancePriority = getPriority(balance.blockchain);
      // return the direct conditional instead of if-else statement 
        // because return the boolean type follow by the condition
      // wrong reference variable `lhsPriority`
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });

      // redundant the dependency `prices`
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // wrong reference variable `sortedBalances`
  // because the `rows` use `formatted` props, the `sortedBalances` does not have
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row} // missing import classes
        key={index} // do not using index as a key, affect the how the React's reconciler work
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
