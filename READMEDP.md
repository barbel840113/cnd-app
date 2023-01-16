#### init testnet
wasmd init <moniker> --chain-id my-test-chain
#### 
wasmd add-genesis-account wasm1ph8h4n5kjjycjhkyw06gyx5rryzdrsxqe48ge6 100000000000stake
####
wasmd gentx talda 100000000stake --chain-id my-test-chain --keyring-backend test
####
wasmd collect-gentxs

export PATH=/mnt/d/cnd/wasmd/build:$PATH