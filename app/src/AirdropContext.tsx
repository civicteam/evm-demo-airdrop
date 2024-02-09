import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import {Airdrop, Airdrop__factory} from "./typechain-types";
import {useWallet} from "./useWallet";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";

type AirdropContextType = {
  client: Airdrop | undefined;
  hasToken: boolean;
  totalTokens: bigint;
}
export const AirdropContext = createContext<AirdropContextType>({
  client: undefined,
  hasToken: false,
  totalTokens: 0n,
});

export const AirdropProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallet = useWallet();
  const [client, setClient] = useState<Airdrop | undefined>();
  const [ hasToken, setHasToken ] = useState(false);
  const [ totalTokens, setTotalTokens ] = useState<bigint>(0n);

  useEffect(() => {
    if (!wallet?.signer || !wallet?.address) return undefined;
    const airdrop = Airdrop__factory.connect(
        contractAddress,
        wallet.signer
    );
    setClient(airdrop)
    airdrop.totalSupply().then((total) => setTotalTokens(total));
    airdrop.balanceOf(wallet.address).then((balance) => {
      if (balance > 0) {
        setHasToken(true);
      }
    });
  }, [wallet?.address]);

  return (
      <AirdropContext.Provider value={{ client, hasToken, totalTokens }}>
        {children}
      </AirdropContext.Provider>
  );
}

export const useAirdrop = () => useContext(AirdropContext);