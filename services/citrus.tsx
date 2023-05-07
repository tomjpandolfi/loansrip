import { Citrus } from '../utils/interfaces';

const fetchCitrus = async ( 
    config:{
        publicJsonRPCUrl: string
    }
) => {

    let data: Citrus[] = [];

    const apiToken = process.env.HELLOMOON_BEARER_API_TOKEN;

    const fetch = require('node-fetch');

    const url = 'https://rest-api.hellomoon.io/v0/citrus/loan-events';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${apiToken}`
      },
      body: JSON.stringify({actionType: 'default'})
    };

    const raw = await fetch(url, options);
    const res = await raw.json();
    console.log("citrus response", res);

const modifiedData = res.data.map((obj: any) => {
    let convertedDate = new Date(obj.blockTime * 1000)
    return {
      date: convertedDate.toLocaleString(),
      collateral: obj.collateralMint,
      previousOwner: obj.borrower,
      loanPosition: obj.loanAccount,
      liquidator: obj.lender,
    //   liquidationTx: obj.transactionId,
      assetLink: obj.transactionId,
    };

});

data.push(...modifiedData)
return data as Citrus[];
}

export default fetchCitrus