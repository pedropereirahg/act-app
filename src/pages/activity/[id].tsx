import { Fragment, useEffect } from 'react';
import { NextPageContext } from 'next'
import Router, { NextRouter, useRouter } from 'next/router'
import { Row, Col, PageHeader, Radio, Checkbox } from 'antd';

import Metadata from '../../components/Metadata';
import { Activity } from '../../commons/factories/activity';
import env from '../../commons/environment'

export interface ActivityPageProps {
  hasError?: boolean;
  basePath?: string;
  activity?: Activity
}

export default function ActivityPage({ hasError, basePath, activity }: ActivityPageProps) {
  const router: NextRouter = useRouter()
  const pageUrl = `${env.ACTIVITIES_API_URL}${basePath}`

  useEffect(() => {
    if (hasError) {
      router.replace('/404', basePath)
    }
  }, [hasError])

  return (
    <Fragment>
      <Metadata title={'Responder questão'} />
      <Col span={16}>
        <PageHeader
          onBack={() => Router.back()}
          title="Pesquisar Questões"
          subTitle="Questão"
        />
        <a href={`https://api.whatsapp.com/send?text=${pageUrl}`} id="whatsapp-share-btt" rel="nofollow" target="_blank">WhatsApp</a>
      </Col>
      {activity && (
        <Row gutter={16} justify="center" align="middle">
          <Col span={16}>
            <Col span={24}>
              <div dangerouslySetInnerHTML={{ __html: activity.statement }} />
            </Col>
            <Row justify="center" align="middle">
              <Col span={24}>
                {activity && activity.type !== 'essay' && Array.isArray(activity.options) && activity.type === 'single-choice' &&
                  <>
                    <Radio.Group>
                      {activity.options.map((item, i) => (
                        <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                          <Col span={24}><Radio value={item.statement}> {item.statement}</Radio></Col>
                        </Row>
                      ))}

                    </Radio.Group>
                  </>
                }
                {activity && activity.type !== 'essay' && Array.isArray(activity.options) && activity.type === 'multiple-choice' &&
                  <>
                    {activity.options.map((item, i) => (
                      <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                        <Col span={24}><Checkbox >{item.statement}</Checkbox></Col>
                      </Row>
                    ))}
                  </>
                }

              </Col>
            </Row>
          </Col>
        </Row >
      )}
    </Fragment >
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
