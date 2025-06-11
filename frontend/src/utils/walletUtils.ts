import freighterApi from "@stellar/freighter-api";

export const connectWallet = async () => {
    try {
        const connected = await freighterApi.isConnected();
        if (!connected) {
            throw new Error("Freighter wallet is not installed");
        }

        const allowed = await freighterApi.isAllowed();
        if (!allowed) {
            await freighterApi.requestAccess();
        }

        const response = await freighterApi.getAddress();
        if (response.error) {
            throw new Error(response.error);
        }
        const publicKey = response.address;
        localStorage.setItem("walletPublicKey", publicKey);
        return publicKey;
    } catch (error) {
        console.error("Error connecting wallet:", error);
        throw error;
    }
};

export const disconnectWallet = () => {
    localStorage.removeItem("walletPublicKey");
};

export const getStoredPublicKey = () => {
    return localStorage.getItem("walletPublicKey");
};
