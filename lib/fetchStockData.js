import axios from 'axios';

const baseUrl = 'https://api.twelvedata.com/time_series';

export async function fetchStockData(symbol, interval, outputsize) {
  const apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;
  try {
    const response = await axios.get(baseUrl, {
      params: {
        symbol: symbol,
        interval: interval,
        outputsize: outputsize,
        apikey: apiKey,
      },
    });
    return response.data.values; // Data for open, close, high, low, etc.
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
}
