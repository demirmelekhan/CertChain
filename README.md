# CertChain: Digital Certificate DApp on Stellar

A decentralized application for issuing and verifying educational certificates on the Stellar blockchain using Soroban smart contracts. This project enables educational institutions to issue immutable digital certificates to students.

## 🌟 Contract Information

- **Contract ID**: `CAEPBXFJWPIUVIICBDBOIGP3H5MOV4LVGM353CRMKYGEBPVHUR4HBQ7I`
- **Network**: Stellar Testnet
- **Explorer Link**: [View on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CAEPBXFJWPIUVIICBDBOIGP3H5MOV4LVGM353CRMKYGEBPVHUR4HBQ7I)

## 🎯 Project Overview

CertChain is designed to revolutionize how educational certificates are issued and verified. Key aspects include:

- **Immutable Records**: Certificates stored on Stellar blockchain
- **Easy Verification**: Simple process to verify certificate authenticity
- **Minimal Interface**: Clean, user-friendly frontend for certificate management
- **Secure Integration**: Freighter wallet connection for secure transactions

## 🚀 Technology Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS
- Freighter Wallet API
- Modern, responsive UI design

### Smart Contract
- Rust + Soroban SDK
- Deployed on Stellar Testnet
- Basic CRUD operations
- State management for certificates

## 🛠 Project Structure

```
├── contract/               # Soroban smart contract
│   ├── src/               
│   │   ├── lib.rs         # Core contract logic
│   │   └── test.rs        # Contract tests
│   └── Cargo.toml         # Rust dependencies
│
├── frontend/              # Next.js application
│   ├── src/              
│   │   ├── app/          # Next.js pages
│   │   └── utils/        # Utility functions
│   └── package.json
│
└── docs/                 # Documentation
    ├── FreighterWalletDocs.md
    └── StellarDeploy.md
```

## ⚡ Quick Start

### Prerequisites
1. Install [Freighter Wallet](https://www.freighter.app/)
2. Create a Stellar testnet account
3. Node.js and npm installed
4. Rust toolchain (for contract development)

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Add Contract ID to .env.local
npm run dev
```

### Smart Contract Deployment
```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/certificate_contract.wasm --source <your-account> --network testnet
```

## 🔑 Key Features

1. **Certificate Issuance**
   - Issue digital certificates to students
   - Store certificate data on Stellar blockchain
   - Automatic tracking of total certificates

2. **Wallet Integration**
   - Secure Freighter wallet connection
   - Transaction signing
   - Public key management

3. **Verification System**
   - Verify certificate authenticity
   - Check certificate details
   - View issuance history

## 🧪 Testing

### Smart Contract Tests
```bash
cd contract
cargo test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔒 Security Features

- Secure wallet integration
- Immutable blockchain records
- Public key verification
- Transaction signing requirements

## 📈 Future Enhancements

1. **Planned Features**
   - Certificate template system
   - Batch issuance capability
   - Advanced search functionality
   - Certificate revocation system

2. **Technical Improvements**
   - Enhanced error handling
   - Performance optimizations
   - Additional test coverage

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Acknowledgments

- Stellar Development Foundation
- Soroban Smart Contracts Team
- Next.js Team
- The Stellar Community

## 📞 Contact

For any queries or suggestions, please open an issue in the repository or contact the maintainers.
