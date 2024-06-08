import React, { useEffect } from "react";

const EconomicCalendar = () => {
  return (
    <div className="economic-data">
      <iframe
        title="Economic Calendar"
        src="https://sslecal2.investing.com?ecoDayBackground=%23e0d667&columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&category=_employment,_economicActivity,_inflation,_credit,_centralBanks,_confidenceIndex,_balance,_Bonds&importance=2,3&features=datepicker,timezone,timeselector,filters&countries=25,17,26,10,52,37,5,35,4,12,22,6,72,43&calType=day&timeZone=70&lang=3"
        className="w-full min-w-[500px]"
        height="500"
      ></iframe>
      <div
        className="poweredBy"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <span
          style={{ fontSize: "11px", color: "#333333", textDecoration: "none" }}
        >
          Real Time Economic Calendar provided by{" "}
          <a
            href="https://www.investing.com/"
            rel="noreferrer"
            target="_blank"
            style={{ fontSize: "11px", color: "#06529D", fontWeight: "bold" }}
          >
            Investing.com
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default EconomicCalendar;
