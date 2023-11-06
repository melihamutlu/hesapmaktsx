import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  styled,
  ThemeProvider,
} from "@mui/material";
import { GridDigitButton, GridOperationButton } from "./Button";
import { createTheme, CssBaseline, IconButton } from "@mui/material";
import {
  Brightness7 as Brightness7Icon,
  Brightness4 as Brightness4Icon,
} from "@mui/icons-material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff149" },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#347474" },
  },
});

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));

function App() {
  type DurumType = {
    prevValue: string;
    currentValue: string;
    operation: string;
    overwrite: boolean;
  };
  const [durum, setDurum] = useState<DurumType>({
    prevValue: "",
    currentValue: "",
    operation: "",
    overwrite: true,
  });

  const equals = () => {
    setDurum((p) => ({
      currentValue: calculate().toString(),
      operation: "",
      prevValue: "",
      overwrite: true,
    }));
  };

  const { currentValue, prevValue, operation, overwrite } = durum;
  const calculate = () => {
    //öncekideğer: prevalue işlem: operation
    if (!durum || !operation) return parseFloat(currentValue);

    const curr = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    let result: number = 0;
    switch (operation) {
      case "÷":
        result = prev / curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "+":
        result = prev + curr;
        break;
    }
    return result;
  };

  const clear = () =>
    setDurum({
      prevValue: "",
      currentValue: "",
      overwrite: true,
      operation: "",
    });

  const del = () =>
    setDurum((p) => ({ ...p, currentValue: "0", overwrite: true }));

  const percent = () => {
    //ondalıklı sayıya çevirme
    setDurum((p) => ({
      ...p,
      currentValue: (parseFloat(currentValue) / 100).toString(),
    }));
  };

  const selectOperation = (x: string) => {
    if (durum.prevValue) {
      const val = calculate();
      setCurrentValue(`${val}`);
      setPrevValue(`${val}`);
    } else {
      setPrevValue(currentValue);
    }
    setOperation(x);
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue[0] === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit === ".") return;

    if (overwrite && digit !== ".") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
    setOverwrite(false);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <CalculatorBase elevation={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <OutputContainer data-testid="output">
                {durum.currentValue}
              </OutputContainer>
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridOperationButton
                operation={"AC"}
                selectOperation={clear}
                selectedOperation={durum.operation}
              />
              <GridOperationButton
                operation={"C"}
                selectOperation={del}
                selectedOperation={durum.operation}
              />
              <GridOperationButton
                operation={"%"}
                selectOperation={percent}
                selectedOperation={durum.operation}
              />
              <GridOperationButton
                operation={"÷"}
                selectOperation={selectOperation}
                selectedOperation={durum.operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton
                digit={"7"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"8"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"9"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridOperationButton
                operation={"*"}
                selectOperation={selectOperation}
                selectedOperation={durum.operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton
                digit={"4"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"5"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"6"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridOperationButton
                operation={"-"}
                selectOperation={selectOperation}
                selectedOperation={durum.operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton
                digit={"1"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"2"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"3"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridOperationButton
                operation={"+"}
                selectOperation={selectOperation}
                selectedOperation={durum.operation}
              />
            </Grid>
            <Grid item container columnSpacing={1}>
              <GridDigitButton
                xs={6}
                digit={"0"}
                enterDigit={setDigit}
                selected={false}
              />
              <GridDigitButton
                digit={"."}
                enterDigit={setDigit}
                selected={false}
              />
              <Grid item xs={3}>
                <Button fullWidth variant="contained" onClick={equals}>
                  =
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CalculatorBase>
      </Container>
    </ThemeProvider>
  );
}

export default App;
