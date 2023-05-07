import { Sharky } from '../utils/interfaces';

const fetchSharky = async ( 
    config:{
        publicJsonRPCUrl: string
    }
) => {

    let data: Sharky[] = [];

    const apiToken = process.env.HELLOMOON_BEARER_API_TOKEN;

    const fetch = require('node-fetch');

    const url = 'https://rest-api.hellomoon.io/v0/sharky/loan-events';
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
    console.log("array from URL", res);
    let date = new Date(res.data[1].blockTime * 1000)
    console.log(date.toLocaleDateString("default"))


const modifiedData = res.data.map((obj: any) => {

    let convertedDate = new Date(obj.blockTime * 1000)

    return {

      date: convertedDate.toLocaleString(),
      collateral: obj.collateralMint,
      loanPosition: obj.loan,
      liquidator: obj.lender,
      assetLink: obj.transactionId,
      
    };

});

data.push(...modifiedData)
return data as Sharky[];
}

export default fetchSharky