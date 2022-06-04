import { Fragment } from 'react';
import { Button, Row, Col, Typography, Space, Result } from 'antd';
import Link from 'next/link';

import Search, { SearchIcon } from '../components/Search/index';
import Metadata from '../components/Metadata/index';
import styles from '../../styles/HomePage.module.scss';

export default function HomePage() {

  return (
    <Fragment>
      <Metadata title={'Banco de atividades'} />
      <Row gutter={8} justify="center" align="middle">
        <Col span={8}>
          <Result
            icon={<SearchIcon />}
            title="Banco de atividades"
            subTitle={
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                Encontre, crie e compartilhe atividades discursivas e objetivas com seus alunos e outros professores
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <Space direction="vertical" align="center" className={styles.contentWrapper}>
            <Search width="400px" />
            <br />
            <Space size="large" align="center" className={styles.contentWrapper}>
              <Link href="/search">
                <Button type="text" color="secondary" className={styles.secondaryButton}>
                  Estou com sorte
                </Button>
              </Link>
              <Link href="/new-activity">
                <Button type="text" className={styles.secondaryButton}>
                  Criar atividade
                </Button>
              </Link>
            </Space>
          </Space>
        </Col>
      </Row>
      <br />
      <br />
      <br />
    </Fragment>
  )
}
