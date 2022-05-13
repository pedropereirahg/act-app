import * as React from 'react';
import { Row, Col, Typography, Button, Input } from 'antd';
import styles from './ EssayQuestion.module.scss';
import Link from 'next/link';

function EssayQuestion() {
  const { TextArea } = Input;

  const sendValue = (event) => {
    console.log(event.target.value)
  }
  return (
    <div className={styles.cardWrapper}>
      <Row gutter={10} justify='center' style={{ height: '200px', width: '100%' }}>
        <Col span={24} align='center'>
          <Typography.Title italic level={4}>Escreva abaixo o enunciado da questão:</Typography.Title>
        </Col>
      </Row>
      <Row gutter={16} justify="center" align="middle" style={{ height: '100%', width: '100%' }}>
        <Col span={12}>
          <TextArea
            onChange={sendValue}
            placeholder="Digite a questão"
            autoSize={{ minRows: 8, maxRows: 15 }}
          />
        </Col>
      </Row>
      <Row gutter={10} justify='center' style={{ height: '500px', width: '100%' }}>
        <Col span={12} align='end'>
          <Button size={'large'} href={'/activity-creation'}>Cancelar</Button>
          <Button size={'large'}>Salvar</Button>
        </Col>
      </Row>

    </div >
  )
};

export default EssayQuestion;
