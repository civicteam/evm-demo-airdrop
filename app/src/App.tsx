import './App.css';
import {useAirdrop} from "./AirdropContext";
import {useAccount, usePrepareTransactionRequest, useSendTransaction} from "wagmi";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {GatewayStatus, IdentityButton, useGateway} from "@civic/ethereum-gateway-react";

const Dashboard = () => {
    const { balance, totalSupply, claim, isPending, txHash, error } = useAirdrop();
    const { gatewayStatus } = useGateway();

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem"
    }}>
        <h1>Claim your Airdrop</h1>
        <IdentityButton />
        { gatewayStatus !== GatewayStatus.ACTIVE && <div>Verify you are a unique person before entering</div>}
        { !balance && <button disabled={gatewayStatus !== GatewayStatus.ACTIVE} onClick={claim}>{ gatewayStatus !== GatewayStatus.ACTIVE ? "Verify first!": "Claim"}</button>}
        { (!!balance || (gatewayStatus !== GatewayStatus.ACTIVE) )&& <button onClick={() => claim({gasLimit: 3000000})}>I don't care, try to claim anyway!</button>}
        { isPending && <p><>Claiming...</></p>}
        { !!balance && <p><>Congratulations, you have a token!</></p>}
        { txHash && <p><>Transaction: {txHash}</></p>}
        { error && <p><>Error: {error.message}</></p>}
        <div>Claimed so far: { totalSupply?.toString() ?? 0 }</div>
    </div>)
}
function App() {
    return (
        <div className="App">
            <div className="container" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}>
                <ConnectButton/>
                <hr/>
                <Dashboard/>
            </div>
        </div>
    );
}

export default App;
