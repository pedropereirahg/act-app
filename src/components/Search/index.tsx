import { useRef, useEffect, useState } from 'react';

import { Input, Button, Card, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import SearchIcon from './Icon'
import styles from './Search.module.scss'
import useSearch from './useSearch';

export type OnChangeFn = (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;

export interface SearchProps {
  onChange?: OnChangeFn;
  width?: string;
  timeout?: number;
  hasQuery?: boolean;
}

export { SearchIcon, useSearch }

export default function Search({ onChange, width, timeout = 0, hasQuery = false }: SearchProps) {
  const inputRef = useRef<any>(null);
  const [initialFocus, setInitialFocus] = useState(false);

  const callbackChange = (callback: Function) => setTimeout(callback, timeout)
  const [query, router] = useSearch(hasQuery ? null : '', callbackChange);

  useEffect(() => {
    if (inputRef.current && !initialFocus) {
      inputRef.current!.focus({ cursor: 'end' });
      setInitialFocus(true);
    }
  }, [inputRef.current, query]);

  const handleChange: OnChangeFn = (value, event) => {
    router.push({
      pathname: '/search',
      query: { query: value }
    })
    if (typeof onChange === 'function') {
      onChange(value, event)
    }
  }

  return typeof query === 'string' ? (
    <Card
      bordered={hasQuery}
      hoverable
      className={styles.cardWrapper}
      bodyStyle={{ padding: !hasQuery ? '12px' : '0px 12px' }}
    >
      <Input.Search
        ref={inputRef}
        placeholder="Qual atividade você está buscando?"
        enterButton={(
          <Button
            type="default"
            icon={<SearchOutlined />}
            style={{ border: 'none', boxShadow: 'none', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}
          />
        )}
        size="large"
        defaultValue={query}
        onSearch={handleChange}
        bordered={false}
        style={{ width }}
        className={styles.inputFix}
      />
    </Card>
  ) : timeout >= 500 ? (
    <Skeleton.Input active size="large" style={{
      ...(hasQuery ? { width: `calc(${width} + 24px)` } : { width })
    }} />
  ) : null

  // return (
  //   <Input
  //     size="large"
  //     prefix={<SearchOutlined />}
  //     placeholder="Digite sua busca..."
  //     onChange={handleChange}
  //   />
  // )
  // return (
  //   <Fragment>
  //     <Row justify="center" align="middle" style={{ height: '40%' }}>
  //       <Col span={8}>
  //         <Input placeholder="Digite sua busca..." onChange={handleChange} />
  //       </Col>
  //       <Col span={1}>
  //         <Link href={'/new-activity'}>
  //           <Button type="primary">+</Button>
  //         </Link>
  //       </Col>
  //     </Row>
  //     <Row justify="center" align="middle">
  //       <Col span={22}>
  //         <CardActivity />
  //       </Col>
  //     </Row>
  //   </Fragment>
  // )
}
