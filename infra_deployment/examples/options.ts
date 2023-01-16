import { HdPath } from "@cosmjs/crypto";
import { GasPrice } from "@cosmjs/stargate";

export interface Options {
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