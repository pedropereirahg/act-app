import { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Metadata from '../../components/Metadata/index';

export default function ActivityPage() {
  const [data, setData] = useState('')
  function GetValue() {
    fetch('https://act-api-dev-r5khawnfbq-uc.a.run.app/activities', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(response => setData(response))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    GetValue()
  })
  const options = ['1', '2', '3']
  const statement = 'teste de questão'

  return (
    <Fragment>
      <Metadata title={'Responder questão'} />
      <Row justify="center" align="middle">
        <Col span={24}>
          <div dangerouslySetInnerHTML={{ __html: statement }} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24}>
          {options.map((item, i) =>
            <div key={i} dangerouslySetInnerHTML={{ __html: item }} />
          )}
        </Col>
      </Row>
    </Fragment>
  )
}
