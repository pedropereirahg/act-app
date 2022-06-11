import { Fragment, useEffect } from 'react';
import { NextPageContext } from 'next'
import Router, { NextRouter, useRouter } from 'next/router'
import { Row, Col, PageHeader, Radio, Checkbox, Typography, Space, Divider, Card } from 'antd';
import { setTwoToneColor, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import Metadata from '../../components/Metadata';
import { Activity } from '../../commons/factories/activity';
import env from '../../commons/environment'
import { ActivityOption } from '../../commons/factories/activity-option';

setTwoToneColor(`${cyan.primary}`);

export interface ActivityPageProps {
  hasError?: boolean;
  basePath?: string;
  activity?: Activity
}

export default function ActivityPage({ hasError, basePath, activity }: ActivityPageProps) {
  const router: NextRouter = useRouter()
  const pageUrl = `${env.ACTIVITIES_API_URL}${basePath}`
  const title = !activity
    ? 'Visualizar Atividade'
    : activity?.title
      ? `${activity.title.slice(0, 10)}...`
      : activity?.type === 'essay'
        ? 'Atividade discursiva'
        : 'Atividade objetiva'

  useEffect(() => {
    if (hasError) {
      router.replace('/404', basePath)
    }
  }, [hasError, router, basePath])

  return (
    <Fragment>
      <Metadata title={title} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <PageHeader
            onBack={() => Router.back()}
            title="Visualizar atividade"
            subTitle={activity?.type === 'essay' ? 'Discursiva' : 'Objetiva'}
          />
          {/* <a href={`https://api.whatsapp.com/send?text=${pageUrl}`} id="whatsapp-share-btt" rel="nofollow" target="_blank">WhatsApp</a> */}
        </Col>
      </Row>

      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <Divider orientation="left" orientationMargin={8}>
            <Space align="center">
              {activity?.type === 'essay' ? (
                <EditTwoTone style={{ marginBottom: '0.75em' }} />
              ) : (
                <CheckCircleTwoTone style={{ marginBottom: '0.75em' }} />
              )}
              <Typography.Title level={5}>Enunciado</Typography.Title>
            </Space>
          </Divider>
          {activity?.statement && (
            <Card>
              <div dangerouslySetInnerHTML={{ __html: activity.statement }} />
              {Array.isArray(activity.options) && activity.type === 'single-choice' ? (
                <Fragment>
                  <Divider />
                  <Radio.Group
                    style={{ width: '100%' }}
                    size="large"
                    disabled
                    defaultValue={activity.options.findIndex(o => o?.isCorrect)}
                  >
                    <Space align="start" direction="vertical" size="large">
                      {activity.options.map(({ statement }, i) => (
                        <Space key={i} align="start" size="large">
                          <Radio value={i}>
                            <Typography.Text>{statement}</Typography.Text>
                          </Radio>
                        </Space>
                      ))}
                    </Space>
                  </Radio.Group>
                </Fragment>
              ) : Array.isArray(activity.options) && activity.type === 'multiple-choice' && (
                <Fragment>
                  <Divider />
                  <Checkbox.Group
                    style={{ width: '100%' }}
                    disabled
                    defaultValue={activity.options.reduce(
                      (acc: number[], o: ActivityOption, index: number): number[] =>
                        o?.isCorrect ? [...acc, index] : [...acc],
                      []
                    )}
                  >
                    <Space align="start" direction="vertical" size="large">
                      {activity.options.map(({ statement }, i) => (
                        <Space key={i} align="start" size="large">
                          <Checkbox value={i}>
                            <Typography.Text>{statement}</Typography.Text>
                          </Checkbox>
                        </Space>
                      ))}
                    </Space>
                  </Checkbox.Group>
                </Fragment>
              )}
            </Card>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}

ActivityPage.getInitialProps = async (context: NextPageContext) => {
  const { id } = context.query
  const basePath = context.req?.url || context.asPath

  const { status, data: activity } = await fetch(`${env.ACTIVITIES_API_URL}/activities/${id}`).then(async res => {
    const json = await res.json()
    if (res.ok) {
      return json
    }
    throw new Error(JSON.stringify(json))
  }).catch(error => {
    console.error(error.message)
    return {
      status: 'error',
      data: {
        id: '',
        type: '',
        statement: '',
        active: true,
        createdAt: '',
        updatedAt: ''
      }
    }
  })

  return {
    hasError: status === 'error',
    basePath,
    activity
  }
}
