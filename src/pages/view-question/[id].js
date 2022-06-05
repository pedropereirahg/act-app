import { Fragment, useEffect, useState } from 'react';
import { Row, Col, PageHeader, Radio, Checkbox } from 'antd';
import Metadata from '../../components/Metadata/index';
import Router from 'next/router';
import { useRouter } from 'next/router'

export default function ActivityPage() {
  /* let questionString = localStorage.getItem('question');
  let question = JSON.parse(questionString); */
  const [content, setContent] = useState('')
  const [data, setData] = useState('')


  const { query } = useRouter()

  function GetValue() {
    if (query.id) {
      fetch(`https://act-api-dev-r5khawnfbq-uc.a.run.app/activities/${query.id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(response => setData(response))
        .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    setContent(window.location.href)
    GetValue()
  }, [query]);

  return (
    <Fragment>
      <Metadata title={'Responder questão'} />
      <Col span={16}>
        <PageHeader
          onBack={() => Router.back()}
          title="Pesquisar Questões"
          subTitle="Questão"
        />
        <a href={`https://api.whatsapp.com/send?text= ${content}`} id="whatsapp-share-btt" rel="nofollow" target="_blank">WhatsApp</a>
      </Col>
      {data !== '' && <Row gutter={16} justify="center" align="middle">
        <Col span={16}>
          <Col span={24}>
            <div dangerouslySetInnerHTML={{ __html: data.data.statement }} />
          </Col>
          <Row justify="center" align="middle">
            <Col span={24}>
              {data.data && data.data.type !== 'essay' && data.data.options.length >= 1 && data.data.type === 'single-choice' &&
                <>
                  <Radio.Group>
                    {data.data.options.map((item, i) => (
                      <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                        <Col span={24}><Radio value={item.statement}> {item.statement}</Radio></Col>
                      </Row>
                    ))}

                  </Radio.Group>
                </>
              }
              {data.data && data.data.type !== 'essay' && data.data.options.length >= 1 && data.data.type === 'multiple-choice' &&
                <>
                  {data.data.options.map((item, i) => (
                    <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                      <Col span={24}><Checkbox >{item.statement}</Checkbox></Col>
                    </Row>
                  ))}
                </>
              }

            </Col>
          </Row>
        </Col>
      </Row >}
    </Fragment >
  )
}
