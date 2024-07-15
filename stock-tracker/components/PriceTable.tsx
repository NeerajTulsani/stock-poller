import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectPrices } from '../store/selectors';
import { setPrices } from '../store/store';
import styles from '../styles/PriceTable.module.css';

interface PriceTableProps {
  crypto: string;
}

const PriceTable: React.FC<PriceTableProps> = ({ crypto }) => {
  const dispatch = useDispatch();
  const prices = useSelector(selectPrices);

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await axios.get(`/api/prices?symbol=${crypto}`);
      dispatch(setPrices(response.data));
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, [dispatch, crypto]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Crypto</th>
          <th>Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price: any, index: number) => (
          <tr key={index}>
            <td>{crypto}</td>
            <td>{price.price} ₹</td>
            <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
