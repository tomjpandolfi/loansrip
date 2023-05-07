import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { CssBaseline, SelectChangeEvent, Typography } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Loading from "../components/Loading";
import DownloadCsv from "../components/Downloadcsv";
import Info from "../components/Info";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Datatable from "../components/Datatable";
import { markets } from "../utils/markets";
import { assetType } from "../utils/interfaces";

import aaveService from "../services/aave";
import honeyService from "../services/honey";
import sharkyService from "../services/sharky";
import fraktService from "../services/frakt";
import citrusService from "../services/citrus";

const Home: NextPage = () => {
  const [tableData, setTableData] = useState<assetType[] | undefined>([]);
  const [market, setMarket] = useState<any>();
  const [selectedMarket, setSelectedMarket] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("honey");
  const [protocolSelected, setProtocolSelected] = useState<boolean>(true);
  const [marketSelected, setMarketSelected] = useState<boolean>(false);
  const [marketLoading, setMarketLoading] = useState<boolean>(false);
  const [missingProtocol, setMissingProtocol] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    setMarket(markets.honey);
    setSelectedMarket("solana");
    const mkt: any = markets.honey.find(
      (n: { name: string }) => n.name === "solana"
    );

    honeyService(mkt.config).then((data) => {
      console.log(data);
      setTableData(data);
      setMarketLoading(false);
    });
  }, []);

  const handleProtocolChange = (event: SelectChangeEvent) => {
    setProtocol(event.target.value);
    setSelectedMarket("");
    setTableData(undefined);

    setProtocolSelected(true);
    setMarketSelected(false);
    setMissingProtocol(false);

    if (event.target.value === "v2") setMarket(markets.v2);
    if (event.target.value === "v3") setMarket(markets.v3);
    if (event.target.value == "honey") setMarket(markets.honey);
    if (event.target.value === "univ3") {
      setMarket(markets.univ3);
      setMissingProtocol(true);
    }
    if (event.target.value === "crvv2") {
      setMarket(markets.crvv2);
      setMissingProtocol(true);
    }
  };

  const handleMarketChange = (event: SelectChangeEvent) => {
    setSelectedMarket("");
    setMarketSelected(true);
    setSelectedMarket(event.target.value);

    if (event.target.value === "all") setMissingProtocol(true);

    if (!(event.target.value === "all")) {
      setMarketLoading(true);

      if (protocol === "v2" || protocol === "v3") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === event.target.value
        );
        setMissingProtocol(true);
      } else if (protocol === "honey") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === "solana"
        );
        honeyService(mkt.config).then((data) => {
          console.log(data);
          setTableData(data);
          setMarketLoading(false);
        });
      } else if (protocol === "sharky") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === "solana"
        );
        sharkyService(mkt.config).then((data) => {
          console.log(data);
          setTableData(data);
          setMarketLoading(false);
        });
      } else if (protocol === "frakt") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === "solana"
        );
        fraktService(mkt.config).then((data) => {
          console.log(data);
          setTableData(data);
          setMarketLoading(false);
        });
      }
      else if (protocol === "citrus") {
        const mkt = market?.find(
          (n: { name: string }) => n.name === "solana"
        );
        citrusService(mkt.config).then((data) => {
          console.log(data);
          setTableData(data);
          setMarketLoading(false);
        });
      }
    }
  };

  const themes = useTheme();
  const matches = useMediaQuery(themes.breakpoints.down("sm"));

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "IBM Plex Mono",
      fontSize: matches ? 9 : 11,
    },
  });

  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>Loans.RIP</title>
        </Head>

        <Header
          matches={matches}
          darkMode={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />

        <Dropdown
          matches={matches}
          protocol={protocol}
          handleProtocolChange={handleProtocolChange}
          selectedMarket={selectedMarket}
          protocolSelected={protocolSelected}
          market={market}
          handleMarketChange={handleMarketChange}
        />

        {!matches && (
          <DownloadCsv
            protocol={protocol}
            riskParams={tableData}
            marketSelected={marketSelected}
            missingProtocol={missingProtocol}
          />
        )}

        <Datatable
          protocol={protocol}
          matches={matches}
          riskParams={tableData}
        />
        {marketLoading ? <Loading marketLoading={marketLoading} /> : ""}

        <Info
          marketSelected={marketSelected}
          missingProtocol={missingProtocol}
        />
        <div style={{ textAlign: 'center' }}>
          { marketSelected ? <Typography>Made with ♥ by <a href="https://tomjpandolfi.com">Tom J. Pandolfi</a></Typography> : ""}
        </div>
      </ThemeProvider>
      
    </div>
  );
};

export default Home;
