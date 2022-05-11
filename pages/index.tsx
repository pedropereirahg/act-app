import * as React from 'react';
import SearchPage from '../src/components/Search/index';
import styles from '../styles/Home.module.scss'

function Home() {
  return (
    <div className={styles.wrapper}>
      <SearchPage />
    </div>
  )
}

export default Home
