## Overview

Loans.RIP is an open source Liquidation tool. It currently features a simple obituary for liquidated NFT loans.

## How to add another protocol to config

First, familiarize yourself with the protocol's APIs. Ideally the documentation will include how to fetch `loan events` , `liquidations` or `defaults` in the API or SDK.

Then, you can insert this formatted data into the relevant places in the loans.rip frontend code which are:

Create an interface for the data that you will return and register it into the types

```utils/interfaces.tsx```

```ts
interface Test {
    aaa: string,
    bbb: string,
    assetLink?: string
}
```

```utils/interfaces.tsx```

```ts
export type assetType = (Honey | Sharky | Test)
```

```utils/interfaces.tsx```

```ts
export type {
  Honey,
  Sharky,
  Test
}
```

The most important part is creating a service that will fetch the data from your source (contracts, subgraph, sdk, ...), in this demo we will just use a simple json as a service

```services/test.tsx```
```ts
import { Test } from "../utils/interfaces"

const getTestData = async () => {

  return ([
    {
        aaa: 'aa',
        bbb: 'bb'
    },
    {
        aaa: 'cc',
        bbb: 'dd'
    }
  ] as Test[])
}

export default getTestData
```

Then you need to add your protocol into the dropdown (the value will be the "protocolId")

```components/Dropdown.tsx```

```ts
<MenuItem value='test'>test</MenuItem>
```

After that you should add the table headers that you want to use:

```utils/headers.tsx```

```ts
test: ['header1', 'header2']
````

And also set the markets that you want to use:

```utils/markets.tsx```
```ts
test : [{
    name: 'test'
}] 
```

Then we need to handle the dropdown changes on the index:

pages/index.tsx (inside ```handleProtocolChange```)

```ts
if(event.target.value === 'test') setMarket(markets.test)
```

```pages/index.tsx``` (inside ```handleMarketChange```)

```ts
...
} else if (protocol === 'test') {
  testService().then(data=> {
    setTableData(data)
    setMarketLoading(false)
  })
  setMarketLoading(false)
}
```

## Contributing

To contribute, please view [contributing](CONTRIBUTING.md) for more info and reach out to [me](https://twitter.com/tomjpandolfi) for your own API keys.


### TODOs

- [ ] Pull HelloMoon historical 7, 14, 30 day data to create default rate charts.
- [ ] Show collection based default data (average LTV, underwater positions, etc.)
- [ ] Calculate liquidity risk per collection by measuring thickness of liquidity vs liquidations
- [ ] Search wallets in obituary
- [ ] Pin data in local storage about your wallet and your collections, to monitor liquidation risks
## Credit

Thank you to [0xJim](https://twitter.com/0xjim). This repo is forked from [config.fyi](https://github.com/WeAreNewt/config.fyi) which served as the inspiration and styling for this project.

Thank you to [HelloMoon](https://hellomoon.io) and [BowTiedPyro](https://twitter.com/BowtiedPyro) for creating the APIs used here.
## License

[Link to code license](LICENSE.md)

# loansrip
