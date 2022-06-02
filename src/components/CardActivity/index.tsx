import Link from 'next/link';
import { Card, Typography } from 'antd';

import { PaginateActivities } from '../../pages/search';
import styles from './CardActivity.module.scss';

export interface CardActivityProps {
  activities: PaginateActivities
}

export default function CardActivity({ activities }: CardActivityProps) {
  return (
    <div className={styles.cardWrapper}>
      {activities.data && activities.data.map(({ title, statement }, i) => (
        <div style={{ marginBottom: 10 }} key={i}>
          <Link href={'/essay-question'}>
            <Card bordered={true} className={styles.card}>
              {/* <Typography.Title level={5}>{title}</Typography.Title> */}
              <Typography.Title level={5}>Title</Typography.Title>
              <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                <div dangerouslySetInnerHTML={{ __html: statement }}/>
              </Typography.Paragraph>
              {/* <div className={styles.description}>
                {item.statement}
              </div> */}
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
};
