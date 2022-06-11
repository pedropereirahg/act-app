import { Fragment, useState } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, PageHeader, Typography, Switch, Space, Divider, Popconfirm, notification } from 'antd';
import { setTwoToneColor, CheckCircleTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import useEditor from '../../components/Editor/useEditor';
import Metadata from '../../components/Metadata';
import SingleChoiceActivity from '../../components/SingleChoiceActivity';
import MultiChoiceActivity from '../../components/MultiChoiceActivity';
import env from '../../commons/environment'
import { ActivityOption } from '../../commons/factories/activity-option';

const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false
});

setTwoToneColor(`${cyan.primary}`);

export default function NewMultipleChoicePage() {
  const editorInitialValue: string = ''
  const router: NextRouter = useRouter()
  const [isMultipleChoice, setIsMultipleChoice] = useState<boolean>(false)

  const saveStatement = (statement: string, options: ActivityOption[]) => saveActivity(
    statement,
    isMultipleChoice ? 'multiple-choice' : 'single-choice',
    options
  )

  const saveActivity = (
    statement: string,
    type: string,
    options: any[]
  ) => fetch(`${env.ACTIVITIES_API_URL}/activities`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, statement, options })
  }).then(async res => {
    const json = await res.json()
    if (res.ok && json?.data?.id) {
      return router.push(`/activity/${json.data.id}`)
    }
    throw new Error(JSON.stringify(json))
  }).catch(() => {
    notification.error({
      message: 'Oops...',
      description: 'Não foi possível criar sua atividade. Tente novamente mais tarde',
    })
  })

  const [editorIsDirty, onEditorSave, editorConfig] = useEditor(
    editorInitialValue,
    saveStatement
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
          <Divider orientation="left" orientationMargin={8}>
            <Space align="center">
              <CheckCircleTwoTone style={{ marginBottom: '0.75em' }} />
              <Typography.Title level={5}>Enunciado</Typography.Title>
            </Space>
          </Divider>
          <Editor
            {...editorConfig}
            initialValue={editorInitialValue}
          />
          <Divider />

          <Space align="start" direction="vertical" style={{ width: '100%', display: 'grid' }}>
            <Space align="center">
              <Popconfirm
                placement="topLeft"
                title={(
                  <Fragment>
                    <Typography.Title level={5} >Tem certeza?</Typography.Title>
                    <Typography.Paragraph type="secondary">Alternativas já preenchidas serão perdidas</Typography.Paragraph>
                  </Fragment>
                )}
                onConfirm={() => setIsMultipleChoice(!isMultipleChoice)}
                okText="Sim"
                cancelText="Não"
              >
                <Switch
                  defaultChecked={isMultipleChoice}
                  checked={isMultipleChoice}
                />
              </Popconfirm>
              <Typography.Text>Permitir mais de uma alternativa correta</Typography.Text>
            </Space>

            {!isMultipleChoice ? (
              <SingleChoiceActivity
                editorIsDirty={editorIsDirty}
                onEditorSave={onEditorSave}
              />
            ) : (
              <MultiChoiceActivity
                editorIsDirty={editorIsDirty}
                onEditorSave={onEditorSave}
              />
            )}
          </Space>
        </Col>
      </Row>
    </Fragment>
  )
}
