// TickerTape.js
import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";

const TickerTape = () => {
  const { theme } = useContext(AppContext);
  const ref = useRef();
  useEffect(() => {
    let refValue;

    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";

      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500",
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "US 100",
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "Bitcoin",
          },
          {
            description: "GBPUSD",
            proName: "FX:GBPUSD",
          },
          {
            description: "DAW30",
            proName: "EIGHTCAP:US30",
          },
          {
            description: "GOLD",
            proName: "CAPITALCOM:GOLD",
          },
          {
            description: "EURUSD",
            proName: "EIGHTCAP:EURUSD",
          },
        ],
        showSymbolLogo: true,
        colorTheme: theme,
        isTransparent: false,
        displayMode: "adaptive",
        locale: "en",
      });

      ref.current.appendChild(script);
      refValue = ref.current;
    }

    return () => {
      if (refValue) {
        while (refValue.firstChild) {
          refValue.removeChild(refValue.firstChild);
        }
      }
    };
  }, [ref, theme]);
  return <div ref={ref} />;
};

export default TickerTape;
