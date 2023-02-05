import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";
import * as fs from "fs";

interface TokenInfo{
  name: string;
  symbol: string;
  decimals: number;
  total_supply: String;
}


const rpcEndpoint = "http://localhost:26657";

const faucetMnemonic =
  "light kiss buzz rescue test have struggle spawn infant picnic glide rival together birth fuel end innocent labor sheriff sunny pulp consider sword text";
const walletAddress = "wasm1mpd06nwea88lwpv908gwpv9k88z87ln7ex3seu";
const faucetName = "validator";
console.info('fsdfsdf');
const gasPrice = GasPrice.fromString("0.025stake");
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucetMnemonic, { prefix: "wasm" });
const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {gasPrice: new GasPrice(Decimal.fromUserInput("200000", 8),"stake")});
console.info(await client.getBalance(walletAddress, "stake"));
const uploadFee = calculateFee(2500_000, gasPrice);
const hackatom = `/mnt/d/cnd/wasmd/contracts/artifacts/cw20_base.wasm`;
const wasm = fs.readFileSync(hackatom);
const tt = fs.readFileSync('/mnt/d/cnd/wasmd/testnet_output_data/address.txt');
console.info(tt);
console.info(wasm);
const uploadReceipt = await client.upload(walletAddress, wasm, uploadFee);
console.info(uploadReceipt);
const symbol = "ETH";
// init erc20 token
const initMsg = {
  name: "ETH",
  symbol: symbol,
  decimals: 18,
  initial_balances: [{ address: walletAddress, amount: "1000000000000" }],
};

const eth_erc_init = await client.instantiate(walletAddress, uploadReceipt.codeId, initMsg, "ETH", "auto",{admin: walletAddress } );
eth_erc_init.logs[0].events[0];
const fooAddr = eth_erc_init.contractAddress;
console.info(fooAddr);
const balance = await client.queryContractSmart(fooAddr, { balance: { address: walletAddress } });
console.info(balance);
// let result :TokenInfo = await client.queryContractSmart("wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d",{token_info: {}});
// console.info(result.decimals);
// const initMsg = {
//   name: "Foo Coin",
//   symbol: "FOO",
//   decimals: 2,
//   initial_balances: [{ address: faucetAddress, amount: "1" }],
// };
// const foo = await client.instantiate(faucetAddress, 1, initMsg, "FOO", "auto", {admin: faucetAddress });
// console.info(foo.contractAddress);
// let balance  = await client.queryContractSmart(foo.contractAddress,{balance: {address: faucetAddress}});
// console.info(balance);

