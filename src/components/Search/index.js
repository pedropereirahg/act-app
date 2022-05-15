import * as React from 'react';
import { Input, Button, Row, Col } from 'antd';
import Link from 'next/link';

import CardActivity from '../CardActivity';

const sendValue = (event) => {
  console.log(event.target.value)
}

function SearchPage() {
  return (
    <React.Fragment>
      <Row justify="center" align="middle" style={{ height: '40%' }}>
        <Col span={8}>
          <Input placeholder="Digite sua busca..." onChange={sendValue} />
        </Col>
        <Col span={1}>
          <Link href={'/activity-creation'}>
            <Button type="primary">+</Button>
          </Link>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={22}>
          <CardActivity />
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default SearchPage;
