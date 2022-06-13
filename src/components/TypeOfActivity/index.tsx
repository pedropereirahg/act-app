import Link from 'next/link';
import { Row, Col, Card, Result, Typography } from 'antd';
import { setTwoToneColor, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

setTwoToneColor(`${cyan.primary}`);

export default function TypeOfActivity() {
  return (
    <Row gutter={22} justify="center" align="middle">
      <Col span={11}>
        <Link href={'/new-activity/essay'}>
          <Card hoverable>
            <Result
              icon={<EditTwoTone />}
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
      <Col span={11}>
        <Link href={'/new-activity/multiple-choice'}>
          <Card hoverable>
            <Result
              icon={<CheckCircleTwoTone />}
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
  )
}
