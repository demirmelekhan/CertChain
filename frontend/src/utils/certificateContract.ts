import SorobanClient from 'soroban-client';
import freighterApi from "@stellar/freighter-api";

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || '';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const RPC_URL = 'https://soroban-testnet.stellar.org';

const server = new SorobanClient.Server(RPC_URL);

class CertificateContract {
    private contract: any; // TODO: Replace with proper type once we have correct typings

    constructor() {
        this.contract = new SorobanClient.Contract(CONTRACT_ID);
    }

    async issueCertificate(studentKey: string, courseName: string) {
        try {
            const source = await freighterApi.getAddress();
            if (!source.address) throw new Error('No wallet connected');

            const operation = this.contract.call(
                "issue_certificate",
                SorobanClient.StrKey.encodeEd25519PublicKey(studentKey),
                SorobanClient.xdr.ScVal.scvString(courseName)
            );

            const transaction = await server.prepareTransaction({
                source: source.address,
                operation,
                networkPassphrase: NETWORK_PASSPHRASE,
            });

            const signedTx = await freighterApi.signTransaction(
                transaction.toXDR(),
                { networkPassphrase: NETWORK_PASSPHRASE }
            );

            const response = await server.sendTransaction(signedTx.signedTxXdr);
            return response;
        } catch (error) {
            console.error('Error issuing certificate:', error);
            throw error;
        }
    }

    async getTotalCertificates(): Promise<number> {
        try {
            const result = await this.contract.call("get_total_certificates");
            return parseInt(result.value().toString(), 10);
        } catch (error) {
            console.error('Error getting total certificates:', error);
            throw error;
        }
    }

    async getLastRecipient(): Promise<string> {
        try {
            const result = await this.contract.call("get_last_recipient");
            if (!result) return '';
            return SorobanClient.StrKey.encodeEd25519PublicKey(result.value());
        } catch (error) {
            console.error('Error getting last recipient:', error);
            throw error;
        }
    }
}

export default new CertificateContract();
