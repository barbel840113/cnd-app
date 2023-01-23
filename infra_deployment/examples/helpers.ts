import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { HdPath } from "@cosmjs/crypto";

const mnemonic = loadOrCreateMnemonic("foo.key");
const { address, client } = await connect(mnemonic, {});
address;

client.getAccount();
// if empty - this only works with CosmWasm
hitFaucet(defaultFaucetUrl, address, "COSM");
client.getAccount();

function loadOrCreateMnemonic(arg0: string) {
    throw new Error("Function not implemented.");
}
