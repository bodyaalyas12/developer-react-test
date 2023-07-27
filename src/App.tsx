import React, { useState } from "react";
import { HandsontableWidget, HighchartsWidget } from "./widgets";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import * as dataSource from "./dataSources/versions.json";

export type Source = "regions" | "products" | "versions";

function App() {
  const [{ tableData, tableHeaders }, setData] = useState(dataSource);
  const [selectedSource, setSelectedSource] = useState<Source>("versions");

  const changeSourceClickHandler = async (value: Source) => {
    const res = await import(`./dataSources/${value}.json`);
    setData(res.default);
    setSelectedSource(value);
  };

  return (
    <Box className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ fontSize: 20, flexGrow: 1 }}
          >
            Developer Assessment
          </Typography>
          <Box>
            <Typography
              variant="overline"
              component="span"
              sx={{ marginRight: 3 }}
            >
              Data Source:
            </Typography>
            <Button
              sx={{
                backgroundColor:
                  selectedSource === "versions" ? "secondary.dark" : undefined,
              }}
              size="small"
              onClick={() => changeSourceClickHandler("versions")}
            >
              Versions
            </Button>
            <Button
              sx={{
                backgroundColor:
                  selectedSource === "products" ? "secondary.dark" : undefined,
                margin: "0 15px",
              }}
              size="small"
              onClick={() => changeSourceClickHandler("products")}
            >
              Products
            </Button>
            <Button
              sx={{
                backgroundColor:
                  selectedSource === "regions" ? "secondary.dark" : undefined,
              }}
              size="small"
              onClick={() => changeSourceClickHandler("regions")}
            >
              Regions
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 3 }} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Highcharts Heatmap
            </Typography>
            <HighchartsWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
          <Grid item lg={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Handsontable Heatmap
            </Typography>
            <HandsontableWidget
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
