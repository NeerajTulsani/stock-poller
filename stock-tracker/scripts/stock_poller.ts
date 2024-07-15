import axios from 'axios';
import connectToDatabase from '../lib/mongodb';
import { forEach } from 'lodash';
import Price from '../models/price';

type cryptos = {
    [key: string]: string
}

let interval: any = null;
const cryptosInfo: cryptos = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    ripple: 'Ripple',
    cardano: 'Cardano',
    polkadot: 'Polkadot'
};

const fetchStockPrices = async (ids: string[]) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: ids.join(','),
          vs_currencies: 'inr'
        }
    });
    return response.data;
};

const pollStocksPrices = async () => {
    const ids: string[] = Object.keys(cryptosInfo);
    const prices = await fetchStockPrices(ids);
    const records: any[] = [];
    forEach(prices, (v: any, k: string) => {
        records.push({
            symbol: cryptosInfo[k],
            price: v.inr,
        });
    });
    try {
        await Price.insertMany(records);
    } catch (err) {
        console.log('Error saving records', err);
    }
};

const startPolling = async () => {
    await connectToDatabase();
    pollStocksPrices();
    interval = setInterval(pollStocksPrices, 10000);
};

const stopPolling = () => {
    if (interval) clearInterval(interval);
};

startPolling();

process.on('SIGTERM', startPolling);
process.on('SIGINT', startPolling);
