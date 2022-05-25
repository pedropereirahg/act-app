import { Fragment, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, PageHeader, Typography, Button, Input, Result, Switch, Space, Collapse, Card, Divider } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { cyan, grey, presetPrimaryColors, presetDarkPalettes, } from '@ant-design/colors';

import useEditor from '../../components/Editor/useEditor';
import Metadata from '../../components/Metadata/index';
const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false
});

export default function NewEssayPage() {
  const [statement, setStatement] = useState('');
  const editorInitialValue: string = ''

  const saveAPI = (content: string) => {
    setStatement(content);
  }

  const [editorIsDirty, onEditorSave, editorConfig] = useEditor(
    editorInitialValue,
    saveAPI
  )

  return (
    <Fragment>
      <Metadata title={'Nova atividade discursiva'} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <PageHeader
            onBack={() => Router.back()}
            title="Nova atividade"
            subTitle="Objetiva"
          />
        </Col>
      </Row>
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          {/* <Result
            icon={<CheckCircleTwoTone twoToneColor={cyan.primary} />}
            title="Objetiva"
            subTitle={
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                Permite criar alternativas para que o aluno selecione uma ou várias respostas
              </Typography.Paragraph>
            }
          /> */}

          <Space align="center">
            <Switch />
            <Typography.Text>Atividade permite mais de uma alternativa como correta</Typography.Text>
          </Space>
          <Divider orientation="left" orientationMargin="0">
            <Typography.Title level={5} style={{ marginLeft: 5 }}>Enunciado</Typography.Title>
          </Divider>

          {statement === '' ? (
            <Editor
              {...editorConfig}
              initialValue={editorInitialValue}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: statement }} />
          )}

          <Divider />

          <Collapse ghost>
            <Collapse.Panel header="Configurações" key="1">
              <Space direction="vertical">
                <Space align="center">
                  <Switch />
                  <Typography.Text>Atividade permite mais de uma alternativa como correta</Typography.Text>
                </Space>
                <Space align="center">
                  <Switch defaultChecked />
                  <Typography.Text>Permitir que os alunos vejam respostas entre si</Typography.Text>
                </Space>
              </Space>
            </Collapse.Panel>
          </Collapse>



          <br />
          {statement === '' ? (
            <Button onClick={onEditorSave} size="large" type="primary" disabled={!editorIsDirty}>
              Salvar
            </Button>
          ) : (
            <Button onClick={() => setStatement('')} size="large" type="primary">
              Editar
            </Button>
          )}

        </Col>
      </Row>
    </Fragment>
  )
}
