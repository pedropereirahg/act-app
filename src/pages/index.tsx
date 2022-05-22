import * as React from 'react';
import type { NextPage } from 'next'

import SearchPage from '../components/Search/index';
import Metadata from '../components/Metadata/index'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Atividades'} />
      <SearchPage />
    </React.Fragment>
  )
}

export default Home;
