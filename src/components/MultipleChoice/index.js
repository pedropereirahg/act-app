import * as React from 'react';
import { Row, Col, Typography, Button, Input, Checkbox } from 'antd';
import styles from './MultipleChoice.module.scss';

function MultipleChoice() {
  const { TextArea } = Input;

  const sendValue = (event) => {
    console.log(event.target.value)
  }

  const checkBox = (event) => {
    console.log(event.target.checked)
  }
  return (
    <div className={styles.cardWrapper}>
      <Row gutter={10} justify='center' style={{ height: '50px', width: '100%' }}>
        <Col span={24} align='center'>
          <Typography.Title italic level={4}>Escreva abaixo o enunciado da questão de multipla escolha:</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ height: '250px', width: '100%' }}>
        <Col span={12}>
          <TextArea
            onChange={sendValue}
            placeholder="Digite a questão"
            autoSize={{ minRows: 8, maxRows: 10 }}
          />
        </Col>
      </Row>


      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Checkbox id='check1' onChange={checkBox}></Checkbox></Col>
        <Col span={11}><Input for='check1' placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>

      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Checkbox></Checkbox></Col>
        <Col span={11}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>

      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Checkbox></Checkbox></Col>
        <Col span={11}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>


      <Row justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
        <Col span={1}><Checkbox></Checkbox></Col>
        <Col span={11}><Input placeholder="Digite sua busca..." onChange={sendValue} /></Col>
      </Row>

      <Row gutter={10} justify='center' align="bottom" style={{ height: '200px', width: '100%' }}>
        <Col span={12} align='end'>
          <Button size={'large'} href={'/activity-creation'}>Cancelar</Button>
          <Button size={'large'}>Salvar</Button>
        </Col>
      </Row>

    </div >
  )
};

export default MultipleChoice;
