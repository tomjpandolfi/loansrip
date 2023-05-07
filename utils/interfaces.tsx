interface Aavev2 {
    symbol: string,
    canCollateral: string,
    LTV: string,
    liqThereshold: string,
    liqBonus: string,
    reserveFactor: string,
    canBorrow: string,
    optimalUtilization: string,
    varBorrowRate: string,
    canBorrowStable: string,
    stableBorrowRate: string,
    shareOfStableRate: string,
    assetLink: string,
}

interface Aavev3 {
    symbol: string,
    canCollateral: string,
    LTV: string,
    liqThereshold: string,
    liqBonus: string,
    reserveFactor: string,
    canBorrow: string,
    optimalUtilization: string,
    varBorrowRate: string,
    canBorrowStable: string,
    stableBorrowRate: string,
    shareOfStableRate: string,
    debtCeiling: string,
    supplyCap: string,
    borrowCap: string,
    eModeLtv: string
    eModeLiquidationThereshold: string,
    eModeLiquidationBonus: string,
    assetLink: string,
}

interface Honey {
    market: string,
    loanPosition: string,
    collateral: string,
    previousOwner: string,
    liquidator: string,
    pNFT: boolean,
    assetLink: string,
}

interface Sharky {
    // market: string,
    date: string,
    collateral: string,
    loanPosition: string,
    // previousOwner: string,
    liquidator: string,
    liquidationTx: string,
    assetLink?: string,
}

interface Frakt {
    // market: string,
    date: string,
    collateral: string,
    previousOwner: string,
    loanPosition: string,
    // liquidator: string,
    liquidationTx: string,
    assetLink?: string,
}

interface Citrus {
    // market: string,
    date: string,
    collateral: string,
    previousOwner: string,
    loanPosition: string,
    liquidator: string,
    liquidationTx: string,
    assetLink?: string,
}

export type assetType = (Aavev2 | Aavev3 | Honey | Sharky | Frakt | Citrus)

export type {
    Aavev2,
    Aavev3,
    Honey,
    Sharky,
    Frakt,
    Citrus
}
