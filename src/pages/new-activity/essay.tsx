import { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, PageHeader, Typography, Button, Alert, Switch, Space, Collapse, Card, Divider } from 'antd';
import { grey } from '@ant-design/colors';

import useEditor from '../../components/Editor/useEditor';
import Metadata from '../../components/Metadata/index';
const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false
});

export default function NewEssayPage() {
  const editorInitialValue: string = ''
  const [statement, setStatement] = useState('');
  const [sendQuestion, setsendQuestion] = useState(false)
  const [value, setValue] = useState({
    "statement": "",
    "type": "essay"
  })

  useEffect(() => {
    setValue({ ...value, statement: statement })
  }, [statement])

  const getValue = (content: string) => {
    setStatement(content)
  }

  const [editorIsDirty, onEditorSave, editorConfig] = useEditor(
    editorInitialValue,
    getValue
  )

  const sendValue = () => {

    fetch('https://act-api-dev-r5khawnfbq-uc.a.run.app/activities', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
      .then(res => res.json())
      .then(() => setsendQuestion(true))
      .catch(error => console.log(error))
  }
  console.log(value)

  return (
    <Fragment>
      <Metadata title={'Nova atividade discursiva'} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <PageHeader
            onBack={() => Router.back()}
            title="Nova atividade"
            subTitle="Discursiva"
          />
        </Col>
      </Row>
      {sendQuestion === false &&
        <>
          <Row gutter={16} justify="center" align="middle">
            <Col span={16}>
              {/* <Result
            icon={<EditTwoTone twoToneColor={cyan.primary} />}
            title="Atividade discursiva"
            subTitle={
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                Define o enunciado para o aluno dissertar, argumentar ou descrever a resposta
              </Typography.Paragraph>
            }
          /> */}
              {/* <Typography.Title level={4} style={{ marginLeft: 5 }}>Enunciado</Typography.Title> */}
              <Divider orientation="left" orientationMargin="0">
                <Typography.Title level={5} style={{ marginLeft: 5 }}>Enunciado</Typography.Title>
              </Divider>
              {statement === '' ?
                <Editor
                  {...editorConfig}
                  initialValue={editorInitialValue}
                />
                :
                <div dangerouslySetInnerHTML={{ __html: statement }} />
              }
              <br />
              <Card bodyStyle={{ backgroundColor: grey[0], opacity: 0.5 }} bordered={true}>
                <Typography.Paragraph italic>
                  A resposta do aluno vai aqui
                </Typography.Paragraph>
              </Card>

              <Divider />

              <Collapse ghost>
                <Collapse.Panel header="Configurações" key="1">
                  <Space direction="vertical">
                    <Space align="center">
                      <Switch />
                      <Typography.Text>O aluno pode enviar um arquivo como resposta</Typography.Text>
                    </Space>
                    <Space align="center">
                      <Switch defaultChecked />
                      <Typography.Text>Permitir que os alunos vejam respostas entre si</Typography.Text>
                    </Space>
                  </Space>
                </Collapse.Panel>
              </Collapse>

              <Divider />

              {/* {Editor && <Editor value={value} onChange={setValue} />} */}
              {/* <button onClick={log}>Log editor content</button> */}
              <Col><Button size="large" type="primary" onClick={onEditorSave} disabled={!editorIsDirty}>Save</Button></Col>

              {/* {dirty && <p>You have unsaved content!</p>} */}
              <Col>

                <Button onClick={sendValue} size="large" type="primary">
                  Salvar Questão
                </Button>
              </Col>
            </Col>
          </Row>
        </>
      }
      {sendQuestion === true &&
        <Row>
          <Col span={15} offset={4} ><Alert showIcon message="Success Text" type="success" /></Col>
        </Row>
      }
      {/* <Row gutter={10} justify='center' style={{ height: '200px', width: '100%' }}>
        <Col span={24}>
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
        <Col span={12}>
          <Button size={'large'} href={'/activity-creation'}>Cancelar</Button>
          <Button size={'large'}>Salvar</Button>
        </Col>
      </Row> */}
    </Fragment >
  )
}
