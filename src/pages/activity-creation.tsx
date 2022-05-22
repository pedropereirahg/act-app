import { Fragment } from 'react';
import Router from 'next/router';
import { Row, Col, PageHeader } from 'antd';

import Metadata from '../components/Metadata/index'
import TypeOfActivity from '../components/TypeOfActivity';

const ActivityCreationPage = () => {
  return (
    <Fragment>
      <Metadata title={'Nova atividade'} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <PageHeader
            onBack={() => Router.back()}
            title="Nova atividade"
            subTitle="Crie uma atividade discursiva ou objetiva"
          />
        </Col>
      </Row>
      <TypeOfActivity />
    </Fragment>
  )
}

export default ActivityCreationPage;
