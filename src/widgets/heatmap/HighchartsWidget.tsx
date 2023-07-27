import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { HeatmapProps } from "./Heatmap.props";
import * as Highcharts from "highcharts";
import heatMap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";

heatMap(Highcharts);
export const HighchartsWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;
  const seriesData = useMemo(() => {
    const arr: Array<[number, number, number]> = [];
    tableData.forEach((row, rowIndex) => {
      row.slice(1).forEach((element, columnIndex) => {
        if (typeof element === "number") {
          arr.push([columnIndex, rowIndex, element]);
        }
      });
    });
    return arr;
  }, [tableData]);
  console.log(Highcharts?.getOptions());
  return (
    <Box id={"highChartsHeatMapContainer"}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "heatmap",
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1,
          },
          xAxis: {
            categories: tableHeaders.slice(1),
          },

          yAxis: {
            categories: tableData.map((el) => el[0]),
            title: null,
            reversed: true,
          },
          accessibility: {
            point: {
              descriptionFormat:
                "{(add index 1)}. " +
                "{series.xAxis.categories.(x)} sales " +
                "{series.yAxis.categories.(y)}, {value}.",
            },
            enabled: false,
          },
          colorAxis: {
            minColor: Highcharts.getOptions().colors?.at(1),
            maxColor: Highcharts.getOptions().colors?.at(8),
          },

          legend: {
            align: "right",
            layout: "vertical",
            margin: 0,
            verticalAlign: "top",
            y: 25,
            symbolHeight: 280,
          },

          series: [
            {
              borderWidth: 1,
              data: seriesData,
              dataLabels: {
                enabled: true,
                color: "#000000",
              },
            },
          ],
        }}
      />
    </Box>
  );
};
