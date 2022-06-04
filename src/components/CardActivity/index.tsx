import Link from 'next/link';
import { Card, Space, Typography } from 'antd';
import { CheckCircleTwoTone, EditTwoTone } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import { Activity } from '../../factories/activity';

export type CardActivityProps = Pick<Activity, 'id' | 'title' | 'type' | 'statement'> & { loading: boolean }

export default function CardActivity(activity: CardActivityProps) {
  const getTitle = (type: string, title?: string) => {
    switch (type) {
      case 'essay':
        return (
          <Space>
            <EditTwoTone twoToneColor={cyan.primary} />
            <Typography.Text>{title || 'Discursiva'}</Typography.Text>
          </Space>
        )

      case 'single-choice':
      case 'multiple-choice':
        return (
          <Space>
            <CheckCircleTwoTone twoToneColor={cyan.primary} />
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

  return (
    <Link href={`/activity/${activity.id}`}>
      <Card
        loading={activity.loading}
        bodyStyle={{ height: '160px' }}
        hoverable
        bordered
        title={getTitle(activity.type, activity.title)}
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
