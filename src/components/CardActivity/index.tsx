import Link from 'next/link';
import { Card, Space, Typography } from 'antd';
import { setTwoToneColor, CheckCircleTwoTone, EditTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import { Activity } from '../../commons/factories/activity';

export type CardActivityProps = Pick<Activity, 'title' | 'type' | 'statement'> & { loading: boolean; url: string; }

setTwoToneColor(`${cyan.primary}`);

export default function CardActivity(activity: CardActivityProps) {
  const getTitle = (type: string, title?: string) => {
    switch (type) {
      case 'essay':
        return (
          <Space>
            <EditTwoTone />
            <Typography.Text>{title || 'Discursiva'}</Typography.Text>
          </Space>
        )

      case 'single-choice':
      case 'multiple-choice':
        return (
          <Space>
            <CheckCircleTwoTone />
            <Typography.Text>{title || 'Objetiva'}</Typography.Text>
          </Space>
        )

      default:
        return (
          <Space>
            <Typography.Text>{title || 'Atividade'}</Typography.Text>
          </Space>
        )
    }
  }
  const cardSelect = (question: any) => {
    localStorage.setItem('question', JSON.stringify(question))
  }

  return (
    <Link href={activity.url}>
      <Card
        loading={activity.loading}
        bodyStyle={{ height: '160px' }}
        hoverable
        bordered
        title={getTitle(activity.type, activity.title)}
        onClick={() => cardSelect(activity)}
      >
        <Typography.Paragraph
          type="secondary"
          ellipsis={{
            rows: 3
          }}
        >
          {activity.statement}
        </Typography.Paragraph>
      </Card>
    </Link>
  )
};
