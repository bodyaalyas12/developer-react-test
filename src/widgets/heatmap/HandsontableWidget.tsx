import React, { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { HeatmapProps } from "./Heatmap.props";
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerRenderer, textRenderer } from "handsontable/renderers";
import { BaseRenderer } from "handsontable/renderers/base";
import chroma from "chroma-js";
import { getMax, getMin } from "../../utils/minMax";
import { CellMeta } from "handsontable/settings";

registerAllModules();

export const HandsontableWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;

  const scale = useMemo(() => {
    const numbers = tableData
      .flat()
      .filter((item) => typeof item === "number") as number[];
    const min = getMin(numbers);
    const max = getMax(numbers);
    return chroma.scale("RdYlBu").domain([max, min]);
  }, [tableData]);

  const heatMapRenderer: BaseRenderer = useCallback(
    function (instance, td, row, col, prop, value, cellProperties) {
      textRenderer(instance, td, row, col, prop, value, cellProperties);
      if (typeof value !== "number") {
        return;
      }
      const color = scale(value);
      td.style.background = color.hex();
    },
    [scale],
  );

  registerRenderer("heatMapRenderer", heatMapRenderer);

  return (
    <Box display={"flex"}>
      <HotTable
        data={[tableHeaders, ...tableData]}
        licenseKey="non-commercial-and-evaluation"
        cells={(row, col, prop) => {
          const cellProperties: CellMeta = {};
          if (row !== 0 && col !== 0) {
            cellProperties.renderer = "heatMapRenderer";
          }
          return cellProperties;
        }}
      />
    </Box>
  );
};
