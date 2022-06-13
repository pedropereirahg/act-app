import { Fragment } from 'react';
import Router, { NextRouter, useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, PageHeader, Typography, Button, Space, Divider, notification } from 'antd';
import { setTwoToneColor, EditTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import useEditor from '../../components/Editor/useEditor';
import Metadata from '../../components/Metadata/index';
import env from '../../commons/environment';

const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false
});

setTwoToneColor(`${cyan.primary}`);

export default function NewEssayPage() {
  const editorInitialValue: string = ''
  const router: NextRouter = useRouter()

  const saveActivity = (statement: string) => fetch(`${env.ACTIVITIES_API_URL}/activities`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: 'essay', statement })
  }).then(async res => {
    const json = await res.json()
    if (res.ok && json?.data?.id) {
      return router.push(`/${json.data.id}`)
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
    saveActivity
  )

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
      <Row gutter={20} justify="center" align="middle">
        <Col span={20}>
          <Divider orientation="left" orientationMargin={8}>
            <Space align="center">
              <EditTwoTone style={{ marginBottom: '0.75em' }} />
              <Typography.Title level={5}>Enunciado</Typography.Title>
            </Space>
          </Divider>
          <Editor
            {...editorConfig}
            initialValue={editorInitialValue}
          />
          <Divider />
          <Button
            size="large"
            type="default"
            onClick={onEditorSave}
            disabled={!editorIsDirty}>
            Criar atividade
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}
