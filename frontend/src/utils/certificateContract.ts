import * as StellarSdk from '@stellar/stellar-sdk';
import freighterApi from "@stellar/freighter-api";

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || 'CAEPBXFJWPIUVIICBDBOIGP3H5MOV4LVGM353CRMKYGEBPVHUR4HBQ7I';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const RPC_URL = 'https://soroban-testnet.stellar.org';

// Initialize Soroban RPC server
const server = new StellarSdk.SorobanRpc.Server(RPC_URL, { allowHttp: true });

class CertificateContract {
    private contractId: string;

    constructor() {
        this.contractId = CONTRACT_ID;
    }

    async issueCertificate(studentKey: string, courseName: string) {
        try {
            const source = await freighterApi.getAddress();
            if (!source.address) throw new Error('No wallet connected');

            // Create contract instance
            const contract = new StellarSdk.Contract(this.contractId);

            // Create transaction
            const transaction = new StellarSdk.TransactionBuilder(
                new StellarSdk.Account(source.address, '0'),
                {
                    fee: '100',
                    networkPassphrase: NETWORK_PASSPHRASE,
                }
            )
            .addOperation(
                contract.call(
                    'issue_certificate',
                    ...[
                        StellarSdk.xdr.ScVal.scvString(studentKey),
                        StellarSdk.xdr.ScVal.scvString(courseName)
                    ]
                )
            )
            .setTimeout(30)
            .build();

            // Sign the transaction
            const signedXdr = await freighterApi.signTransaction(
                transaction.toXDR(),
                { networkPassphrase: NETWORK_PASSPHRASE }
            );

            // Submit the transaction
            const tx = StellarSdk.TransactionBuilder.fromXDR(
                signedXdr.signedTxXdr,
                NETWORK_PASSPHRASE
            );
            const submittedTx = await server.sendTransaction(tx);
            
            // Wait for confirmation
            let status;
            let result;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                result = await server.getTransaction(submittedTx.hash);
                status = result.status;
            } while (status !== StellarSdk.SorobanRpc.Api.GetTransactionStatus.SUCCESS);

            return result;
        } catch (error) {
            console.error('Error issuing certificate:', error);
            throw error;
        }
    }

    async getTotalCertificates(): Promise<number> {
        try {
            const response = await server.getContractData(
                this.contractId,
                StellarSdk.xdr.ScVal.scvSymbol('total')
            );
            return Number(response.val?.value()) || 0;
        } catch (error) {
            console.error('Error getting total certificates:', error);
            return 0;
        }
    }

    async getLastRecipient(): Promise<string> {
        try {
            const response = await server.getContractData(
                this.contractId,
                StellarSdk.xdr.ScVal.scvSymbol('last_recipient')
            );
            return response.val?.value()?.toString() || '';
        } catch (error) {
            console.error('Error getting last recipient:', error);
            return '';
        }
    }
}

export default new CertificateContract();
