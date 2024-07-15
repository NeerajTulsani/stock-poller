import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../store/store';
import { setCrypto, setModalOpen } from '../store/store';
import { selectCrypto, selectModalOpen } from '../store/selectors';
import PriceTable from '../components/PriceTable';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const crypto = useSelector(selectCrypto);
  const modalopen = useSelector(selectModalOpen);

  useEffect(() => {
    const storedCrypto = localStorage.getItem('crypto');
    if (storedCrypto) {
      dispatch(setCrypto(storedCrypto));
    }
  }, [dispatch]);

  const changeCrypto = (newCrypto: string) => {
    dispatch(setCrypto(newCrypto));
    localStorage.setItem('crypto c', newCrypto);
    dispatch(setModalOpen(false));
  };

  const toggleModal = () => {
    dispatch(setModalOpen(!modalopen));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cryptocurrency Real-Time Price</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={toggleModal}>Select Crypto</button>
      </div>
      <PriceTable crypto={crypto} />

      {modalopen && (
        <div className={styles.modal} onClick={toggleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h2>Select Cryptocurrency</h2>
            <button className={styles.button} onClick={() => changeCrypto('Bitcoin')}>Bitcoin</button>
            <button className={styles.button} onClick={() => changeCrypto('Ethereum')}>Ethereum</button>
            <button className={styles.button} onClick={() => changeCrypto('Ripple')}>Ripple</button>
            <button className={styles.button} onClick={() => changeCrypto('Cardano')}>Cardano</button>
            <button className={styles.button} onClick={() => changeCrypto('Polkadot')}>Polkadot</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default wrapper.withRedux(Home);
