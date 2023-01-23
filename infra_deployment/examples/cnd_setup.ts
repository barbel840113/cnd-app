import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet, makeCosmoshubPath } from "@cosmjs/proto-signing";
import { HdPath } from "@cosmjs/crypto";

import * as fs from "fs";
import axios from  "axios";

interface Options {
    readonly httpUrl: string
    readonly networkId: string
    readonly feeToken: string
    readonly bech32prefix: string
    readonly hdPath: HdPath
    readonly faucetUrl?: string
    readonly defaultKeyFile: string,
    readonly fees: {
      upload: number,
      init: number,
      exec: number
    },
    readonly gasPrice: GasPrice,
  }
const wasmOptions: Options = {
    httpUrl: 'http://localhost:26657',
    networkId: 'cnd',
    bech32prefix: 'wasm',
    feeToken: 'stake',
    faucetUrl: '',
    defaultKeyFile:  '',
    hdPath: makeCosmoshubPath(0),
    fees: {
      upload: 6000000,
      init: 500000,
      exec: 200000,
    },
    gasPrice: GasPrice.fromString("0.025stake"),
  }
const rpcEndpoint = "http://localhost:26657";
const downloadWasm = async (url: string): Promise<Uint8Array> => {
    const r = await axios.get(url, { responseType: "arraybuffer" })
    if (r.status !== 200) {
      throw new Error(`Download error: ${r.status}`)
    }
    return r.data
  }

const password = "P@ssword1";
// Example user from scripts/wasmd/README.md
const admin = {
  mnemonic: "recipe kingdom barely gallery beauty biology venture verify patrol aware note core actress fat area romance client travel critic power vapor impose rebel physical",
  address0: " wasm16ps2ysn3avarp3tr00c8gauy49au9xgunfet5w",
//   address1: "wasm1hhg2rlu9jscacku2wwckws7932qqqu8xm5ca8y",
//   address2: "wasm1xv9tklw7d82sezh9haa573wufgy59vmwnxhnsl",
//   address3: "wasm17yg9mssjenmc3jkqth6ulcwj9cxujrxxg9nmzk",
//   address4: "wasm1f7j7ryulwjfe9ljplvhtcaxa6wqgula3nh873j",
};

async function main(hackatomWasmPath: string) {
  const gasPrice = GasPrice.fromString("0.025stake");
  console.info("Setting up talda account account");
  let wallet = await DirectSecp256k1HdWallet.fromMnemonic(admin.mnemonic, { prefix: "wasm", bip39Password: password });
  let  client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {prefix: "wasm"});
  let address = await wallet.getAccounts();
  console.info(await client.getChainId());
  console.info(await client.getBalance(address[0].address, "stake"));
  console.info("Connect with signer");
  console.info("Wallet info " + wallet.mnemonic);  

  wallet = await DirectSecp256k1HdWallet.generate(24, {prefix: "wasm"});
  const encrypted = await wallet.serialize(password);
  wallet = await DirectSecp256k1HdWallet.deserialize(encrypted, password);
  console.info("wallet" + wallet.mnemonic);
  address = await wallet.getAccounts();
  client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {prefix: "wasm"});
  console.info(await client.getChainId());
  console.info(await client.getBalance(address[0].address, "stake"));
  // Upload contract
  //  const wasm = fs.readFileSync(hackatomWasmPath);
  const uploadFee = calculateFee(1_500_000, gasPrice);
  console.info("Uploading the SC");
  const sourceUrl = "https://github.com/CosmWasm/cosmwasm-plus/releases/download/v0.10.2/cw20_base.wasm"
  const wasm = await downloadWasm(sourceUrl)

  //send tokens
  let response = await client.sendTokens(admin.address0, "wasm1j0406fmd2h6c0adufvvqpvp4su9twd8whct4wu", [{denom: "stake", amount: "10000"}], uploadFee);
  console.info(response.data);
//   const uploadReceipt = await client.upload(admin.address0, wasm, uploadFee);
//   console.info("Upload succeeded. Receipt:", uploadReceipt);


  // Instantiate
  const instantiateFee = calculateFee(500_000, gasPrice);
  // This contract specific message is passed to the contract
//   const msg = {
//     beneficiary: alice.address0,
//     verifier: alice.address0,
//   };
//   const { contractAddress } = await client.instantiate(
//     alice.address0,
//     uploadReceipt.codeId,
//     msg,
//     "My instance",
//     instantiateFee,
//     { memo: `Create a hackatom instance` },
//   );
//   console.info(`Contract instantiated at: `, contractAddress);

//   // Execute contract
//   const executeFee = calculateFee(300_000, gasPrice);
//   const result = await client.execute(alice.address0, contractAddress, { release: {} }, executeFee);
//   const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
//   console.info("The `wasm` event emitted by the contract execution:", wasmEvent);
}

const repoRoot = "/mnt/d"; // process.cwd() + ""; // This assumes you are in `packages/cli`
const hackatom = `${repoRoot}/cnd/cw-plus/artifacts/cw20_base.wasm`;
await main(hackatom);
console.info("The show is over.");



