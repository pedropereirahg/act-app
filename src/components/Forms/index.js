import * as React from 'react';
import { Row, Col, Typography, Tabs } from 'antd';
import styles from './MultipleChoice.module.scss';
import MultipleChoice from './FormMultipleChoice';
import SingleChoice from './FormSingleChoice';

function Forms() {

  const { TabPane } = Tabs;


  return (
    <div className={styles.cardWrapper}>
      <Tabs centered style={{ width: '100%' }}>
        <TabPane tab="Escolha única" key="radio">
          <SingleChoice />
        </TabPane>
        <TabPane tab="Multipla Escolha" key="checkbox">
          <MultipleChoice />
        </TabPane>
      </Tabs>

    </div >
  )
};

export default Forms;

