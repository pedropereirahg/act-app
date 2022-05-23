import * as React from 'react';
import { Row, Col, Button, Input } from 'antd';

function MultipleChoice() {
  const { TextArea } = Input;

  const sendValue = (event) => {
    console.log(event.target.value)
  }

  const checkBox = (event) => {
    console.log(event.target.checked)
  }

  return (
    <form style={{ width: '100%' }}>
      <Row justify="center" align="middle" style={{ height: '150px', width: '100%' }}>
        <Col span={12}>
          <TextArea
            onChange={sendValue}
            placeholder="Digite a questão"
            autoSize={{ minRows: 5, maxRows: 8 }}
          />
        </Col>
      </Row>


      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Input type='checkbox' multiple='true' /></Col>
        <Col span={11}><Input for='check1' placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>

      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Input type='checkbox' multiple='true' /></Col>
        <Col span={11}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>

      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Input type='checkbox' multiple='true' /></Col>
        <Col span={11}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>


      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Input type='checkbox' multiple='false' /></Col>
        <Col span={11}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>


      <Row gutter={10} justify='center' align="bottom" style={{ height: '50px', width: '100%' }}>
        <Col span={12} align='end'>
          <Button size={'large'} href={'/activity-creation'}>Cancelar</Button>
          <Button size={'large'}>Salvar</Button>
        </Col>
      </Row>
    </form>
  )
};

export default MultipleChoice;

