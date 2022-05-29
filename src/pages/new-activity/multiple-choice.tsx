import { Fragment, useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, PageHeader, Typography, Button, Input, Checkbox, Result, Switch, Space, Collapse, Card, Divider, Radio } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { cyan, grey, presetPrimaryColors, presetDarkPalettes, } from '@ant-design/colors';
import axios from 'axios';

import useEditor from '../../components/Editor/useEditor';
import Metadata from '../../components/Metadata/index';
const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false
});
export default function NewEssayPage() {
  const { TextArea } = Input;
  const [isMultipleChoice, setIsMultipleChoice] = useState(Boolean)
  const [option, setOption] = useState({ "statement": "", isCorrect: false } as any);
  const [value, setValue] = useState({
    "statement": "",
    "options": [],
    "type": "singleChoice"
  } as any);



  const [statement, setStatement] = useState('');
  const editorInitialValue: string = ''


  const saveAPI = (content: string) => {
    setStatement(content);
  }

  const [editorIsDirty, onEditorSave, editorConfig] = useEditor(
    editorInitialValue,
    saveAPI
  )
  useEffect(() => {
    setValue({ ...value, statement: statement })
  }, [statement])

  const sendValue = () => {
    console.log(JSON.stringify(value))
    axios.get('https://actedu-act-api-hml.herokuapp.com/activities', {

      headers:
      {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      }
    })
      .then(result => console.log(result))
    /*     fetch('https://actedu-act-api-dev.herokuapp.com/activities', {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
           body: JSON.stringify(value)
        })
           .then((response) => console.log(response.json()))
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log(error)) */


  }


  const handleChange = (event: any) => {
    setOption({ ...option, statement: event.target.value })
  };

  const handleClick = () => {
    setValue({
      ...value,
      options: [...value.options, option]
    })
    setOption({ "statement": "", isCorrect: false })
  };

  const deleteOption = (statement: any) => {
    const newOptions = value.options.filter((option: any) => option.statement !== statement)
    setValue({ ...value, options: newOptions })
  };

  const onChange = (checked: boolean) => {
    setIsMultipleChoice(checked)
  };

  const isCorrectSingleChoice = (event: any) => {
    const checkedInput = value.options.find((option: any) => option.statement === event.target.value)
    setValue({
      ...value, options: value.options.map((option: any) => {
        if (option.statement === checkedInput.statement) {
          return { ...option, isCorrect: true }
        } else {
          return { ...option, isCorrect: false }
        }
      })
    })
  }

  const isCorrectMultipleChoice = (event: any) => {
    const checkedInput = value.options.find((option: any) => option.statement === event.target.value)
    setValue({
      ...value, options: value.options.map((option: any) => {
        if (option.statement === checkedInput.statement) {
          if (checkedInput.isCorrect === false) {
            return { ...option, isCorrect: true }
          } else {
            return { ...option, isCorrect: false }
          }
        } else {
          return { ...option }
        }
      })
    })
  }


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
            <Switch onChange={onChange} />
            <Typography.Text>Atividade permite mais de uma alternativa como correta</Typography.Text>
          </Space>
          <Divider orientation="left" orientationMargin="0">
            <Typography.Title level={5} style={{ marginLeft: 5 }}>Enunciado</Typography.Title>
          </Divider>

          {statement === '' ? (
            <>
              <Editor
                {...editorConfig}
                initialValue={editorInitialValue}
              />

            </>

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
            <>
              <Button onClick={() => setStatement('')} size="large" type="primary">
                Editar
              </Button>
              {isMultipleChoice === false ?
                <Row>
                  <Radio.Group>
                    {value.options.map((option: any, i: any) => (
                      <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                        <Col span={24}><Radio value={option.statement} onChange={isCorrectSingleChoice}>{option.statement} <Button danger onClick={() => deleteOption(option.statement)}>x</Button></Radio></Col>
                      </Row>
                    ))}

                  </Radio.Group>
                </Row> :
                <div>
                  {value.options.map((option: any, i: any) => (
                    <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                      <Col span={24}><Checkbox value={option.statement} onChange={isCorrectMultipleChoice}>{option.statement} <Button danger onClick={() => deleteOption(option.statement)}>x</Button></Checkbox></Col>
                    </Row>
                  ))
                  }
                </div>
              }
              <TextArea
                onChange={handleChange}
                placeholder="Digite a questão"
                autoSize={{ minRows: 2, maxRows: 3 }}
                value={option.statement}
              />
              <Button size={'large'} type="primary" onClick={handleClick}>Adicionar</Button>
            </>
          )}
          <Row>
            <Button onClick={sendValue} size="large" type="primary">
              Salvar Questão
            </Button>
          </Row>

        </Col>
      </Row>
    </Fragment>
  )
}
