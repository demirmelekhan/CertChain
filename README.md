# Digital Certificate dApp (Stellar Soroban)

This repository contains a complete implementation of a Digital Certificate issuance system built on the Stellar blockchain using Soroban smart contracts.

## 📁 Project Structure

```
├── contract/               # Soroban smart contract (Rust)
│   ├── src/               
│   │   ├── lib.rs         # Contract implementation
│   │   └── test.rs        # Contract tests
│   └── Cargo.toml         # Rust dependencies
│
├── frontend/              # Next.js web application
│   ├── src/              
│   │   ├── app/          # Next.js pages
│   │   └── utils/        # Utility functions
│   └── package.json      # Node.js dependencies
│
└── docs/                 # Documentation
    ├── FreighterWalletDocs.md
    ├── StellarDeploy.md
    └── pdr.md           # Product Design Requirements
```

## 🎯 Features

- Issue digital certificates on Stellar blockchain
- Connect with Freighter Wallet
- Modern UI with Next.js and Tailwind CSS
- Rust-based Soroban smart contract
- Testnet deployment support

## 🚀 Quick Start

### Smart Contract Deployment

1. Navigate to contract directory:
```bash
cd contract
```

2. Build the contract:
```bash
cargo build --target wasm32-unknown-unknown --release
```

3. Deploy to Stellar testnet (requires Rust and stellar-cli):
```bash
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/certificate_contract.wasm --source <your-account> --network testnet
```

### Frontend Development

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your contract ID
```

4. Run development server:
```bash
npm run dev
```

## 📚 Documentation

- Check `docs/` directory for detailed documentation
- `FreighterWalletDocs.md`: Wallet integration guide
- `StellarDeploy.md`: Deployment instructions
- `pdr.md`: Product design requirements and specifications

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.
