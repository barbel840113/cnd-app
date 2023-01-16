import { StdFee, SigningStargateClient } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { coins } from "@cosmjs/amino";
import { Bech32 } from "@cosmjs/encoding";
import { Random } from "@cosmjs/crypto";

const defaultHttpUrl = "http://localhost:26657";
const defaultFee: StdFee = {
  amount: [
    {
      amount: "5000",
      denom: "stake",
    },
  ],
  gas: "890000",
};

const faucetMnemonic =
  "recipe kingdom barely gallery beauty biology venture verify patrol aware note core actress fat area romance client travel critic power vapor impose rebel physical";
const faucetAddress = "wasm16ps2ysn3avarp3tr00c8gauy49au9xgunfet5w";
const faucetName = "validator";

const wallet = await DirectSecp256k1HdWallet.fromMnemonic(faucetMnemonic, {prefix: 'wasm'});
const client = await SigningStargateClient.connectWithSigner(defaultHttpUrl, wallet);
const accounts = await wallet.getAccounts();
accounts.forEach(async x => {
  console.info("address" + x.address);
  let balance = await client.getBalance(x.address,"stake");
  let mnemonit = wallet.mnemonic;  
console.info( balance.amount + ' balance');
console.info('denom - ' + balance.denom);
console.info( mnemonit + ' mnemonit');    
});

