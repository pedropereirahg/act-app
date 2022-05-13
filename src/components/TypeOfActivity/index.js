import * as React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import Link from 'next/link';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './TypeOfActivity.module.scss';

function TypeOfActivity() {
  return (
    <div className={styles.cardWrapper}>
      <Typography.Title strong level={3}>Selecione a opção correspondente a nova atividade:</Typography.Title>
      <Row gutter={16} justify="center" align="middle" style={{ height: '100%', width: '100%' }}>
        <Col span={8}>
          <Link href={'/essay-question'}>
            <Card bordered={false} className={styles.card}>
              Dissertativa <CheckCircleOutlined />
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link href={'/'}>
            <Card bordered={false} className={styles.card}>
              Múltipla Escolha <CheckCircleOutlined />
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link href={'/'}>
            <Card bordered={false} className={styles.card}>
              Escolha Única <CheckCircleOutlined />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
};

export default TypeOfActivity;
