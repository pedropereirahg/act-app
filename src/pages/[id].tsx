import { Fragment, useEffect, useState, useRef } from 'react';
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { Row, Col, PageHeader, Radio, Checkbox, Typography, Space, Divider, Card, Skeleton, Popconfirm } from 'antd';
import { setTwoToneColor, EditTwoTone, CheckCircleTwoTone, WhatsAppOutlined, LinkOutlined, ShareAltOutlined, PrinterOutlined } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';
import { useReactToPrint } from 'react-to-print';

import Metadata from '../components/Metadata';
import { Activity } from '../commons/factories/activity';
import env from '../commons/environment'
import { ActivityOption } from '../commons/factories/activity-option';
import Link from 'next/link';

setTwoToneColor(`${cyan.primary}`);

export interface ActivityPageProps {
  hasError?: boolean;
  basePath?: string;
  activity?: Activity
}

export default function ActivityPage({ hasError, basePath, activity }: ActivityPageProps) {
  const router: any = useRouter()
  const activityRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => activityRef.current,
  });

  const pageUrl = `${env.ACTIVITIES_APP_URL}${basePath}`
  const title = !activity
    ? 'Atividade escolar'
    : activity?.title
      ? `Atividade escolar - ${activity.title.slice(0, 20)}...`
      : activity?.type === 'essay'
        ? 'Atividade discursiva'
        : 'Atividade objetiva'

  const [onBack, setOnBack] = useState({})

  useEffect(() => {
    if (hasError) {
      router.replace('/404', basePath)
    }
  }, [hasError, router, basePath])

  useEffect(() => {
    if (router.isReady && !Object.keys(onBack).length) {
      setTimeout(
        () => setOnBack(
          router?.components && Object.keys(router?.components).length !== 2
            ? { onBack: () => router.back() }
            : { onBack: undefined }
        ), 700
      )
    }
  }, [router, onBack])

  return (
    <Fragment>
      <Metadata title={title} />
      <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          {router.isReady && Object.keys(onBack).length ? (
            <PageHeader
              {...onBack}
              title="Atividade"
              subTitle={activity?.type === 'essay' ? 'Discursiva' : 'Objetiva'}
              extra={[
                <Popconfirm
                  key={0}
                  placement="bottomRight"
                  icon={<ShareAltOutlined style={{ color: '#0050b3' }} />}
                  showCancel={false}
                  title={(
                    <Fragment>
                      <Typography.Paragraph>Copie o link abaixo e compartilhe com outros professores!</Typography.Paragraph>
                      <Typography.Text type="secondary" copyable style={{ fontSize: '0.9em' }}>{pageUrl}</Typography.Text>
                    </Fragment>
                  )}
                >
                  <ShareAltOutlined style={{ color: '#0050b3', fontSize: '1.5em', marginRight: '8px' }} />
                </Popconfirm>
                ,
                <a
                  key={1}
                  href={`https://api.whatsapp.com/send?text=Veja%20esta%20atividade%20que%20encontrei%21%0D%0A%0D%0A${pageUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Compartilhe no Whatsapp"
                  style={{ color: '#25d366' }}
                >
                  <WhatsAppOutlined style={{ fontSize: '1.5em', marginRight: '8px' }} />
                </a>,
                <PrinterOutlined onClick={handlePrint} key={2} style={{ fontSize: '1.5em' }} />
              ]}
            />
          ) : (
            <div style={{ padding: '20px 24px' }}>
              <Skeleton.Input active block />
            </div>
          )}

          {/* <a href={`https://api.whatsapp.com/send?text=${pageUrl}`} id="whatsapp-share-btt" rel="nofollow" target="_blank">WhatsApp</a> */}
        </Col>
      </Row>

      <Row ref={activityRef} gutter={16} justify="center" align="middle">
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
