import { Frakt } from '../utils/interfaces';

const fetchFrakt = async ( 
    config:{
        publicJsonRPCUrl: string
    }
) => {

    let data: Frakt[] = [];

    const apiToken = process.env.HELLOMOON_BEARER_API_TOKEN;

    const fetch = require('node-fetch');

    const url = 'https://rest-api.hellomoon.io/v0/frakt/loan-events';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${apiToken}`
      },
      body: JSON.stringify({actionType: 'liquidate_loan'})
    };

    const raw = await fetch(url, options);
    const res = await raw.json();
    console.log("frakt response", res);


const modifiedData = res.data.map((obj: any) => {
    let convertedDate = new Date(obj.blockTime * 1000)
    return {
      date: convertedDate.toLocaleString(),
      collateral: obj.nftMint,
      previousOwner: obj.borrower,
      loanPosition: obj.loan,
    //   liquidator: obj.lender,
      assetLink: obj.transactionId,
    };

});

data.push(...modifiedData)
return data as Frakt[];
}

export default fetchFrakt