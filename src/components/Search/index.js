import * as React from 'react';
import { Input, Button, Row, Col } from 'antd';
import Link from 'next/link';

const sendValue = (event) => {
  console.log(event.target.value)
}

function SearchPage() {
  return (
    <Row justify="center" align="middle" style={{ height: '100%', background: '#ececec' }}>
      <Col span={8}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      <Col span={1}><Link href={'/activity-creation'}><Button type="primary">+</Button></Link></Col>
    </Row>
  )
};

export default SearchPage;
