type TokenLabelProps = {
  tokenName: string;
};
const TokenLabel = (props: TokenLabelProps) => {
  const { tokenName } = props;
  return (
    <div className="flex items-center gap-2 justify-between flex-1">
      <img
        src={`/tokens/${tokenName}.svg`}
        alt={tokenName}
        className="w-8 h-8"
      />

      <p className="text-background">{tokenName}</p>
    </div>
  );
};

export default TokenLabel;
