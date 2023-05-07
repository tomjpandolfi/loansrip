import { Honey } from '../utils/interfaces';

const fetchHoney = async ( 
    config:{
        publicJsonRPCUrl: string
    }
) => {

    let data: Honey[] = [];

    const apiToken = process.env.HONEY_API_TOKEN;
    
    const raw = await fetch(`${apiToken}`);
    const res = await raw.json();
    console.log("array from URL", res);

const modifiedData = res.map((obj: any) => {

return {
  market: obj.marketId === "6FcJaAzQnuoA6o3sVw1GD6Ba69XuL5jinZpQTzJhd2R3" ? "Honey Genesis Bee" : "Unkown",
  collateral: obj.collateralNFTMint,
  previousOwner: obj.previousOwner,
  loanPosition: obj.obligationId,
  liquidator: obj.payer === "4mhZ7qW2EpryeT9YkBGwfWRVE75pJsFdqCGB7WpKdic2" ? "Honey API" : "Unkown",
  pNFT: obj.isPNFT ? "true" : "false",
};
});
    console.log("mod data", modifiedData)
    data.push(...modifiedData)
      
      return data as Honey[];
    } 

export default fetchHoney