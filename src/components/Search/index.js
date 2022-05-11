import * as React from 'react';
import { Input, Button, Row, Col } from 'antd';
/* import styles from './SearchPage.module.scss' */

const sendValue = (event) => {
  console.log(event.target.value)
}

function SearchPage() {
  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Col span={8}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      <Col span={1}><Button type="primary">+</Button></Col>
    </Row>
  )
};

export default SearchPage;
