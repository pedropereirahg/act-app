import { Fragment } from 'react';
import { Row, Col, PageHeader } from 'antd';

import Metadata from '../../components/Metadata/index';
import Search, { useSearch } from '../../components/Search';
import styles from '../../../styles/SearchPage.module.scss';

export default function SearchPage() {
  const [query, router] = useSearch('');

  return (
    <Fragment>
      <Metadata title={`${query} - Pesquisa atividades`} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <PageHeader
            className={styles.pageHeader}
            onBack={() => router.back()}
            title="Busca"
            extra={[(
              <Search
                width="600px"
                timeout={500}
                hasQuery={true}
              />
            )]}
          />
        </Col>
      </Row>
    </Fragment>
  )
}
