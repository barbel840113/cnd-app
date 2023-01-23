import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";

interface TokenInfo{
  name: string;
  symbol: string;
  decimals: number;
  total_supply: String;
}


const rpcEndpoint = "http://localhost:26657";

const faucetMnemonic =
  "recipe kingdom barely gallery beauty biology venture verify patrol aware note core actress fat area romance client travel critic power vapor impose rebel physical";
const faucetAddress = "wasm16ps2ysn3avarp3tr00c8gauy49au9xgunfet5w";
const faucetName = "validator";
console.info('fsdfsdf');
const gasPrice = GasPrice.fromString("0.025stake");
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucetMnemonic, { prefix: "wasm" });
const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {gasPrice: new GasPrice(Decimal.fromUserInput("200000", 8),"stake")});
const account = await client.getAccount(faucetAddress);
let result :TokenInfo = await client.queryContractSmart("wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d",{token_info: {}});
console.info(result.decimals);
const initMsg = {
  name: "Foo Coin",
  symbol: "FOO",
  decimals: 2,
  initial_balances: [{ address: faucetAddress, amount: "1" }],
};
const foo = await client.instantiate(faucetAddress, 1, initMsg, "FOO", "auto", {admin: faucetAddress });
console.info(foo.contractAddress);
let balance  = await client.queryContractSmart(foo.contractAddress,{balance: {address: faucetAddress}});
console.info(balance);

