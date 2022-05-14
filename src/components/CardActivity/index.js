import * as React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import Link from 'next/link';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './CardActivity.module.scss';

const activity = {
  "statusCode": 200,
  "status": "success",
  "data": [
    {
      "active": true,
      "type": "essay",
      "id": "19bec488-012f-465b-9597-0463b58f2d0c",
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "statement": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "options": [],
      "createdAt": "2022-05-02T03:06:26.292Z",
      "updatedAt": "2022-05-02T03:06:26.292Z"
    },
    {
      "active": true,
      "type": "essay",
      "id": "19bec488-012f-465b-9597-0463b58f2d0c",
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "statement": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "options": [],
      "createdAt": "2022-05-02T03:06:26.292Z",
      "updatedAt": "2022-05-02T03:06:26.292Z"
    },
    {
      "active": true,
      "type": "essay",
      "id": "19bec488-012f-465b-9597-0463b58f2d0c",
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "statement": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "options": [],
      "createdAt": "2022-05-02T03:06:26.292Z",
      "updatedAt": "2022-05-02T03:06:26.292Z"
    },
    {
      "active": true,
      "type": "essay",
      "id": "19bec488-012f-465b-9597-0463b58f2d0c",
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "statement": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "options": [],
      "createdAt": "2022-05-02T03:06:26.292Z",
      "updatedAt": "2022-05-02T03:06:26.292Z"
    },
    {
      "active": true,
      "type": "essay",
      "id": "19bec488-012f-465b-9597-0463b58f2d0c",
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "statement": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "options": [],
      "createdAt": "2022-05-02T03:06:26.292Z",
      "updatedAt": "2022-05-02T03:06:26.292Z"
    },
    {
      "active": true,
      "type": "essay",
      "id": "19bec488-012f-465b-9597-0463b58f2d0c",
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "statement": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "options": [],
      "createdAt": "2022-05-02T03:06:26.292Z",
      "updatedAt": "2022-05-02T03:06:26.292Z"
    }
  ],
  "count": 1,
  "currentPage": 1,
  "perPage": 20,
  "pages": 1,
  "total": 1
}

function CardActivity() {
  return (
    <div className={styles.cardWrapper}>

      {activity.data && activity.data.map((item, i) => (
        <div style={{ margimBottom: 10 }} key={i}>
          <Link href={'/essay-question'}>
            <Card bordered={false} className={styles.card}>
              <Typography.Title level={5}>{item.title}</Typography.Title>
              <div className={styles.description}>
                {item.statement}
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
};

export default CardActivity;
