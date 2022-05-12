import * as React from 'react';
import type { NextPage } from 'next'
import SearchPage from '../src/components/Search/index';
import Metadata from '../src/components/Metadata/index'
import IncludeActivity from '../src/components/Modal/index'
/* import styles from '../styles/Home.module.scss' */

const Home: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const OpenModal = () => {
    return (
      setIsModalVisible(true)
    )
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <Metadata />
      <IncludeActivity
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <SearchPage handleClick={OpenModal} />
    </React.Fragment>
  )
}

export default Home;
