import { Fragment } from 'react';
import { Button, Row, Col, Typography, Space, Result } from 'antd';
import Link from 'next/link';
import Icon from '@ant-design/icons';

import SearchSvg from '../assets/search.svg';
import Search from '../components/Search/index';
import Metadata from '../components/Metadata/index';
import styles from '../styles/HomePage.module.scss';

export default function HomePage() {
  return (
    <Fragment>
      <Metadata title={'Atividade Escolar - Banco de atividades gratuito'} />
      <Row gutter={12} justify="center" align="middle">
        <Col span={12}>
          <Result
            icon={<Icon component={() => <SearchSvg width="2.5em" />} />}
            title={<Typography.Title level={3}>Banco de atividades gratuito</Typography.Title>}
            subTitle={
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 3 }}>
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
