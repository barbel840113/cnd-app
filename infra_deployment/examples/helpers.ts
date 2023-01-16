const mnemonic = loadOrCreateMnemonic("foo.key");
const { address, client } = await connect(mnemonic, {});
address;

client.getAccount();
// if empty - this only works with CosmWasm
hitFaucet(defaultFaucetUrl, address, "COSM");
client.getAccount();

client.getCodes();

// query the first contract for first code
const contracts = await client.getContracts(1);
contracts;
const info = await client.getContract(contracts[0].address);
info;
info.initMsg;

// see your balance here
client.queryContractSmart(addr, { balance: { address } });