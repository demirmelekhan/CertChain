# Digital Certificate dApp on Stellar

A decentralized application for issuing and verifying digital certificates on the Stellar blockchain using Soroban smart contracts.

## 🎯 Project Overview

This dApp allows educational institutions to issue digital certificates to students, which are securely stored on the Stellar blockchain. Each certificate is represented as a unique token, making it tamper-proof and easily verifiable.

### Key Features

- **Wallet Integration**: Connect with Freighter Wallet
- **Issue Certificates**: Create and issue digital certificates to students
- **Verification**: All certificates are verifiable on the Stellar blockchain
- **Simple Interface**: Modern, user-friendly UI built with Next.js and Tailwind CSS

## 🚀 Technology Stack

- **Frontend**: 
  - Next.js with TypeScript
  - Tailwind CSS for styling
  - Freighter Wallet API for Stellar interaction

- **Smart Contract**: 
  - Rust + Soroban SDK
  - Deployed on Stellar Testnet
  - Basic state management for certificates

## 🛠 Getting Started

### Prerequisites

1. Install [Freighter Wallet](https://www.freighter.app/) browser extension
2. Create a Stellar testnet account
3. Node.js and npm installed

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd rwa-vibe-certchain/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_CONTRACT_ID=your_contract_id_here
```

4. Run the development server:
```bash
npm run dev
```

## 💡 Usage

1. Connect your Freighter Wallet
2. Navigate to the certificate issuance page
3. Enter student's public key and course name
4. Submit the transaction through Freighter
5. View transaction status and total certificates issued

## 🧪 Testing

The project includes comprehensive tests for both the smart contract and frontend components:

- **Smart Contract Tests**: Located in `contract/src/test.rs`
- **Frontend Tests**: Component and integration tests using Next.js testing utilities

## 🔒 Security

- All transactions are signed through Freighter Wallet
- Certificates are immutably stored on the Stellar blockchain
- Public key verification ensures certificate authenticity

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- [Your Name/Team Members]
- [Contact Information]

## 🌟 Acknowledgments

- Stellar Development Foundation
- Soroban Smart Contracts
- Next.js Team

## Deploy işlemi
demir@demirmelekhan:/mnt/c/Users/demir/github/Egitim-WEB3/Rust-Stellar/rwa-vibe-certchain/contract$ stellar contract deploy \
  --wasm target/wasm32v1-none/release/certificate_contract.wasm \
  --source melek \
  --network testnet \
  --alias rwa-vibe-certain   
ℹ️ Simulating install transaction…
ℹ️ Signing transaction: 920fc7b4018ed9a3d82e96f04da4a61d428d5ec1488a93f171a1fb080dafe4e5
🌎 Submitting install transaction…
ℹ️ Using wasm hash c6fc0927211502f3d71498952d2d208b4b6bdbd317f5e955419ed7be79a591d3
ℹ️ Simulating deploy transaction…
ℹ️ Transaction hash is 36205f36b3baa1e17ea84b78acf7c4c19bc42950f975624b63d3da1b252c2274
🔗 https://stellar.expert/explorer/testnet/tx/36205f36b3baa1e17ea84b78acf7c4c19bc42950f975624b63d3da1b252c2274
ℹ️ Signing transaction: 36205f36b3baa1e17ea84b78acf7c4c19bc42950f975624b63d3da1b252c2274
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CAEPBXFJWPIUVIICBDBOIGP3H5MOV4LVGM353CRMKYGEBPVHUR4HBQ7I
✅ Deployed!
CAEPBXFJWPIUVIICBDBOIGP3H5MOV4LVGM353CRMKYGEBPVHUR4HBQ7I