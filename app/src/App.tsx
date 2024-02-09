import './App.css';
import {useAirdrop} from "./AirdropContext";
import {useAccount} from "wagmi";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {GatewayStatus, IdentityButton, useGateway} from "@civic/ethereum-gateway-react";

const Dashboard = () => {
    const { isConnected } = useAccount()
    const { client, hasToken } = useAirdrop();
    const { gatewayStatus } = useGateway();
    if (!client || !isConnected) return <></>;

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem"
    }}>
        <h1>Claim your Airdrop</h1>
        <IdentityButton />
        { gatewayStatus !== GatewayStatus.ACTIVE && <div>Verify you are a unique person before entering</div>}
        { !hasToken && <button disabled={gatewayStatus !== GatewayStatus.ACTIVE} onClick={() => client.claim()}>{ gatewayStatus !== GatewayStatus.ACTIVE ? "Verify first!": "Claim"}</button>}
        { (hasToken || (gatewayStatus !== GatewayStatus.ACTIVE) && <button onClick={() => client.claim({gasLimit: 3000000})}>I don't care, try to claim anyway!</button>)}
        { hasToken && <p><>You have a token</></p>}
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
