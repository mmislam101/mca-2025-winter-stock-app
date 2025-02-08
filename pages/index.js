import { useState } from 'react';
import { fetchStockData } from '../lib/fetchStockData';
import { calculateRunningAverage } from '../lib/calculateAverages';
import { LineChart } from '@mui/x-charts/LineChart';
import { TextField, Button, Container, Typography } from '@mui/material';

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [dataWeek, setDataWeek] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataYear, setDataYear] = useState([]);

  const fetchAndCalculateAverages = async () => {
    console.log("mmi: 1")
    const weekData = await fetchStockData(symbol, '1day', 7); // 7 days for a week
    const monthData = await fetchStockData(symbol, '1day', 30); // 30 days for a month
    const yearData = await fetchStockData(symbol, '1day', 365); // 365 days for a year

    console.log("mmi: 2")
    setDataWeek(calculateRunningAverage(weekData, 7));
    setDataMonth(calculateRunningAverage(monthData, 30));
    setDataYear(calculateRunningAverage(yearData, 365));

    console.log("mmi: 3")
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Stock Running Averages
      </Typography>
      <TextField
        label="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <Button variant="contained" onClick={fetchAndCalculateAverages}>
        Get Stock Data
      </Button>

      {/* Weekly Running Average Chart */}
      <Typography variant="h6" gutterBottom>
        1 Week Running Average
      </Typography>
      <LineChart
        width={600}
        height={300}
        series={[
          {
            data: dataWeek.map((d) => ({ x: d.datetime, y: d.average })),
            label: 'Week',
          },
        ]}
      />

      {/* Monthly Running Average Chart */}
      <Typography variant="h6" gutterBottom>
        1 Month Running Average
      </Typography>
      <LineChart
        width={600}
        height={300}
        series={[
          {
            data: dataMonth.map((d) => ({ x: d.datetime, y: d.average })),
            label: 'Month',
          },
        ]}
      />

      {/* Yearly Running Average Chart */}
      <Typography variant="h6" gutterBottom>
        1 Year Running Average
      </Typography>
      <LineChart
        width={600}
        height={300}
        series={[
          {
            data: dataYear.map((d) => ({ x: d.datetime, y: d.average })),
            label: 'Year',
          },
        ]}
      />
    </Container>
  );
}
