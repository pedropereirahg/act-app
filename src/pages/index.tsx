import { Fragment, ChangeEventHandler, SyntheticEvent } from 'react';
import { Button, Row, Col, Typography, Space, Result, Affix } from 'antd';
import Link from 'next/link';

import Search, { SearchIcon } from '../components/Search/index';
import Metadata from '../components/Metadata/index';
import styles from '../../styles/HomePage.module.scss';

export default function HomePage() {

  return (
    <Fragment>
      <Metadata title={'Banco de atividades'} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
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
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <Space align="center" size="large" className={styles.contentWrapper}>
            {/* <NotFoundActivity /> */}
            {/* <Result
            // icon={<DatabaseTwoTone twoToneColor={cyan.primary} />}
            icon={false}
            title="Não encontrou o que procurava?"
            subTitle={
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                Encontre, crie e compartilhe atividades discursivas e objetivas com seus alunos e outros professores
              </Typography.Paragraph>
            }
          /> */}
            {/* <SearchPage handleChange={handleChange} width="450px" /> */}

          </Space>
        </Col>
      </Row>
      {/* <Col span={1}>
          <Link href={'/new-activity'}>
            <Button type="primary">
              Nova atividade
            </Button>
          </Link>
        </Col> */}

      {/* <Row justify="center" align="middle" style={{ height: '40%' }}>
        <Col span={8}>
          <Input placeholder="Digite sua busca..." onChange={handleChange} />
        </Col>
        <Col span={1}>
          <Link href={'/new-activity'}>
            <Button type="primary">+</Button>
          </Link>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={22}>
          <CardActivity />
        </Col>
      </Row> */}
      {/* <SearchPage /> */}
    </Fragment>
  )
}
