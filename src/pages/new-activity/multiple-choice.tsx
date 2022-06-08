import { Fragment, useEffect, useState } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, PageHeader, Typography, Button, Input, Checkbox, Switch, Space, Collapse, Divider, Radio, Alert } from 'antd';
import { setTwoToneColor, CheckCircleTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import useEditor from '../../components/Editor/useEditor';
import Metadata from '../../components/Metadata';
import env from '../../commons/environment'

const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false
});

setTwoToneColor(`${cyan.primary}`);

export default function NewEssayPage() {
  const { TextArea } = Input;
  const [sendQuestion, setSendQuestion] = useState(false)
  const [isMultipleChoice, setIsMultipleChoice] = useState(Boolean)
  const [selectICorrect, setSelectICorrect] = useState(true)
  const [option, setOption] = useState({ "statement": "", isCorrect: false } as any);
  const [value, setValue] = useState({
    "statement": "",
    "options": [],
    "type": "single-choice"
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

  useEffect(() => {
    disabledButton()
  }, [value])

  const sendValue = () => {
    fetch(`${env.ACTIVITIES_API_URL}/activities`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
      .then(res => res.json())
      .then(() => setSendQuestion(true))
      .catch(error => console.log(error))
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

  const deleteOption = (currentOptionIndex: any) => {
    const newOptions = value.options.filter((_: any, index: number) => index !== currentOptionIndex)
    setValue({ ...value, options: newOptions })
  };

  const onChange = (checked: boolean) => {
    setSelectICorrect(true)
    setIsMultipleChoice(checked)
    checked === false ? setValue({ ...value, type: 'single-choice' }) : setValue({ ...value, type: 'multiple-choice' })

  };

  const isCorrectSingleChoice = (currentOptionIndex: number) => {
    setValue({
      ...value, options: value.options.map((option: any, index: number) => {
        return { ...option, isCorrect: index === currentOptionIndex }
      })
    })
  }

  const isCorrectMultipleChoice = (currentOptionIndex: number) => {
    setValue({
      ...value, options: value.options.map((option: any, index: number) => {
        if (index === currentOptionIndex) {
          return { ...option, isCorrect: !option.isCorrect }
        }
        return option
      })
    })
  }

  const disabledButton = () => {
    setSelectICorrect(true)
    const isCorrect = value.options.map((item: any) => {
      return item.isCorrect
    })
    const findCorrect = isCorrect.filter((element: any) => element === true)

    if (value.options.length >= 2 && findCorrect[0] === true && value.type === 'single-choice') {
      setSelectICorrect(false)

    } else if (value.options.length >= 3 && findCorrect.length >= 2) {
      setSelectICorrect(false)
    }


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
          {sendQuestion === false && (
            <Fragment>
              <Divider orientation="left" orientationMargin={8}>
                <Space align="center">
                  <CheckCircleTwoTone style={{ marginBottom: '0.75em' }} />
                  <Typography.Title level={5}>Enunciado</Typography.Title>
                </Space>
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

              <Space align="center">
                <Switch onChange={onChange} />
                <Typography.Text>Atividade permite mais de uma alternativa como correta</Typography.Text>
              </Space>

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
                            <Col span={24}><Radio value={option.statement} onChange={() => isCorrectSingleChoice(i)}>{option.statement} <Button danger onClick={() => deleteOption(i)}>x</Button></Radio></Col>
                          </Row>
                        ))}

                      </Radio.Group>
                    </Row> :
                    <div>
                      {value.options.map((option: any, i: any) => (
                        <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                          <Col span={24}><Checkbox checked={option.isCorrect} onChange={() => isCorrectMultipleChoice(i)}>{option.statement} <Button danger onClick={() => deleteOption(i)}>x</Button></Checkbox></Col>
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

                <Button onClick={sendValue} size="large" type="primary" disabled={selectICorrect}>
                  Salvar Questão
                </Button>
              </Row>
            </Fragment>
          )}
          {sendQuestion === true && (
            <Row>
              <Col span={24}><Alert showIcon message="Success Text" type="success" /></Col>
            </Row>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}
