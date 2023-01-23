#### init testnet
wasmd init talda --chain-id cnd

# run this
jq '.chain_id = "cnd"' genesis.json > temp.json && mv temp.json genesis.json

# to enable the api server
sed -i '/\[api\]/,+3 s/enable = false/enable = true/' app.toml

# to change the voting_period
jq '.app_state.gov.voting_params.voting_period = "600s"' genesis.json > temp.json && mv temp.json genesis.json

# to change the inflation
jq '.app_state.mint.minter.inflation = "0.300000000000000000"' genesis.json > temp.json && mv temp.json genesis.json

#### 
wasmd add-genesis-account wasm16ps2ysn3avarp3tr00c8gauy49au9xgunfet5w 10000000000000000000000stake

####
wasmd gentx validator 10000000000000000000000stake --chain-id cnd --keyring-backend test
####
wasmd collect-gentxs

export PATH=/mnt/d/cnd/wasmd/build:$PATH
