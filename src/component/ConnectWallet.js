import { useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

function ConnectWallet() {
    const { connectAsync, connectors } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { address, isConnected, isConnecting } = useAccount();
    const { data : balance } = useBalance({address});
    const formattedBalance = useMemo(() => {
        if(!balance?.value) return 0;
        const finalBalance = formatUnits(balance?.value.toString(), balance?.decimals);
        return Number(finalBalance).toFixed(4);
    }, [balance])

    const handleConnectWallet = async (connector) => {
        console.log("In connect wallet");
        try {
            const response = await connectAsync(
                {connector: connector}
            );
        } catch (error) {
            console.error("Error in connect wallet");
            disconnectAsync();
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnectAsync();
        } catch (error) {
            console.error("Error in connect wallet");
        }
    };

    return (
        <div>
            {
                isConnected?<div onClick={handleDisconnect}>
                <p style={{color: 'white', cursor: 'pointer'}}>
                    {address}
                </p><p style={{color: 'white'}}>Balance: {formattedBalance} BNB</p>
                </div>:
                connectors?.map((connector)=>
                <button disabled={isConnecting} onClick={() => handleConnectWallet(connector)}>
                    Connect Wallet
                </button>)
            }
        </div>
    );
}

export default ConnectWallet;
