import * as React from 'react';
import Link from 'next/link';
import { Row, Col, Card, Result, Typography } from 'antd';
import { EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

function TypeOfActivity() {
  return (
    <React.Fragment>
      <Row gutter={16} justify="center" align="middle">
        <Col span={8}>
          <Link href={'/essay-question'}>
            <Card bordered={false} hoverable={true}>
              <Result
                icon={<EditTwoTone twoToneColor={cyan.primary} />}
                title="Discursiva"
                subTitle={
                  <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                    Define o enunciado para o aluno dissertar, argumentar ou descrever a resposta
                  </Typography.Paragraph>
                }
              />
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link href={'/multiple-choice'}>
            <Card bordered={false} hoverable={true}>
              <Result
                icon={<CheckCircleTwoTone twoToneColor={cyan.primary} />}
                title="Objetiva"
                subTitle={
                  <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                    Permite criar alternativas para que o aluno selecione uma ou várias respostas
                  </Typography.Paragraph>
                }
              />
            </Card>
          </Link>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default TypeOfActivity;
