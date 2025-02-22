import { useState } from 'react';
import { fetchStockData } from '../lib/fetchStockData';
import { calculateRunningAverage } from '../lib/calculateAverages';
import { LineChart } from '@mui/x-charts/LineChart';
import { TextField, Button, Container, Typography } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function Stocks() {
  const [symbol, setSymbol] = useState('');
  const [dataWeek, setDataWeek] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const router = useRouter();

  const fetchAndCalculateAverages = async () => {
    const weekData = await fetchStockData(symbol, '1day', 7); // 7 days for a week
    const monthData = await fetchStockData(symbol, '1day', 30); // 30 days for a month
    const yearData = await fetchStockData(symbol, '1day', 365); // 365 days for a year

    let running_average = calculateRunningAverage(weekData, 7)
    setDataWeek(running_average);
    setDataMonth(calculateRunningAverage(monthData, 30));
    setDataYear(calculateRunningAverage(yearData, 365));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (symbol.trim() === '') return;
    try {
      await addDoc(collection(db, 'stockSymbols'), { symbol });
      setSymbol('');
      alert('Stock symbol added!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add stock symbol.');
    }
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
            data: dataWeek,
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
            data: dataMonth,
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
            data: dataYear,
            label: 'Year',
          },
        ]}
      />

    <Typography variant="h4" gutterBottom>
        Add Stock Symbol
    </Typography>
    <form onSubmit={handleSubmit}>
        <TextField
        label="Stock Symbol"
        variant="outlined"
        fullWidth
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
        Save
        </Button>
    </form>
    <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push('/stockslist')}
        sx={{ mt: 2 }}
    >
        View Stock Symbols
    </Button>
    </Container>
  );
}
