import { useState } from "react";
import { useQuery } from "react-query";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import format from "date-fns/format";
import { formatPrice } from "./CryptoTracker";



const everyMonth : number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let today = new Date();
let sum = 0;

for (let i = 0; i < today.getMonth(); i++) {
  sum += everyMonth[i];
}
let total = sum + today.getDate();
console.log(total, 'total');

const intervals = [
  {
    label: "1M",
    value: 30,
    order: 1,
  },
  {
    label: "6D",
    value: 182,
    order: 2,
  },
  {
    label: "1Y",
    value: 365,
    order: 3,
  },
  {
    label: "3Y",
    value: 1095,
    order: 4,
  },
  {
    label: "YTD",
    value: total,
    order: 5,
  }
];



const useGetChartData = (cryptoName: string, interval: number, options: object) => {
  return useQuery(
    ["chartData", interval],
    async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=${interval}`
      );
      return await response.json();
    },
    options
  );
};

interface TypeChartData {
    cryptoName: string;
    isExpanded: boolean;
}

const ChartData = ({ cryptoName, isExpanded } : TypeChartData) => {
  const [dataInterval, setDataInterval] = useState<number>(intervals[0].value);


  const { isLoading, data } = useGetChartData(cryptoName, dataInterval, {
    refetchInterval: 60000,
    staleTime: 60000,
    select: (data: any) =>
      data?.prices?.map((item: any) => ({
        x: item[0],
        y: item[1]
      }))
  });

  

  console.log("data", data);
  const tempLine = (d : number) => {
    if (d === 30) {
      return "rgb(23,23,23)";
    } else if (d === 182) {
      return "rgb(73,73,73)";
    } else if (d === 365) {
      return "rgb(123,123,123)";
    } else if (d === 1095) {
      return "rgb(173,173,173)";
    } else if (d === total) {
      return "rgb(223,223,223)";
    }
  };

  const tempChart = (f : number) => {
    if (f === 30) {
      return "red";
    } else if (f === 182) {
      return "pink";
    } else if (f === 365) {
      return "blue";
    } else if (f === 1095) {
      return "green";
    } else if (f === total) {
      return "black";
    }
  };
  
  

  return (
    <div className="chart">
      <div className="chart-actions">
        {intervals.map((interval) => (
          <button
            key={interval.value}
            className={dataInterval === interval.value ? "active" : "inactive"}
            onClick={() => setDataInterval(interval.value)}
          >
            {interval.label}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="loading-container">
          <span>Loading...</span>
        </div>
      ) : !isExpanded ? (
        <VictoryLine
          style={{
            data: {
              stroke: "#fff",
              strokeWidth: 2
            }
          }}
          width={300}
          height={150}
          data={data}
        />
      ) : (
        <VictoryChart
          width={800}
          height={400}
          domainPadding={5}
          style={{
            parent: {
              border: "1px solid #ccc"
            },
            background: {
              fill: tempChart(dataInterval) as string
            }
          }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => formatPrice(datum.y)} // Format the price
              title={`${cryptoName} price data chart`} // For screen readers
              labelComponent={
                <VictoryTooltip
                  style={{
                    fill: "#333",
                    fontSize: 16
                  }}
                  flyoutStyle={{
                    fill: "#fff",
                    stroke: "#fff",
                    strokeWidth: 1,
                    margin: 10
                  }}
                />
              }
            />
          }
        >
          <VictoryLine
            style={{
              data: {
                stroke: tempLine(dataInterval) as string,
                //stroke: ((intervals[0].order === 1) ? "rgb(23,23,23)" : ((intervals[1].order === 2) ? "rgb(73,73,73)" : ((intervals[2].order === 3) ? "rgb(123,123,123)" : ((intervals[3].order === 4) ? "rgb(173,173,173)" : "rgb(223,223,223)")))),
                strokeWidth: 2
              }
            }}
            data={data}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              axis: {
                stroke: "#fff",
                strokeWidth: 2
              },
              tickLabels: {
                fill: "#fff"
              }
            }}
            tickFormat={(x) => {
              if (dataInterval === 1) {
                return format(x, "p");
              }

              return format(x, "MM/dd");
            }}
          />
        </VictoryChart>
      )}
    </div>
  );
};

export default ChartData;
