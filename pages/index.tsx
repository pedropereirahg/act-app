import * as React from 'react';
import type { NextPage } from 'next'
import SearchPage from '../src/components/Search/index';
import Metadata from '../src/components/Metadata/index'
/* import styles from '../styles/Home.module.scss' */

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Atividades'} />
      <SearchPage />
    </React.Fragment>
  )
}

export default Home;
