// pages/stocks.js
import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function StocksList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const querySnapshot = await getDocs(collection(db, 'stockSymbols'));
        const stocksData = [];
        querySnapshot.forEach((doc) => {
          stocksData.push({ id: doc.id, ...doc.data() });
        });
        setStocks(stocksData);
      } catch (error) {
        console.error('Error fetching stock symbols: ', error);
      }
    }

    fetchStocks();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stock Symbols List
      </Typography>
      <List>
        {stocks.map((stock) => (
          <ListItem key={stock.id}>
            <ListItemText primary={stock.symbol} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
