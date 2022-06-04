import { useRef, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Input, Button, Card, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import useSearch from './useSearch';
import styles from './Search.module.scss'

type OnChangeFn = (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;

export interface SearchProps {
  query?: string;
  onChange?: OnChangeFn;
  width?: string;
  timeout?: number;
  isLoading?: boolean;
  hasQuery?: boolean;
  allowClear?: boolean;
}

export { useSearch }

export default function Search({
  query = '',
  onChange,
  width,
  timeout = 0,
  isLoading = false,
  hasQuery = false,
  allowClear = false
}: SearchProps) {
  const router: NextRouter = useRouter()
  const inputRef = useRef<any>(null);
  const [initialFocus, setInitialFocus] = useState(false);

  useEffect(() => {
    if (inputRef.current && !initialFocus) {
      inputRef.current!.focus({ cursor: 'end' });
      setInitialFocus(true);
    }
  }, [initialFocus]);

  const handleSearch: OnChangeFn = (value, event) => {
    let query = {}

    if (typeof value === 'string' && value !== '') {
      query = { q: value }
    }

    router.push({
      pathname: '/search',
      query
    })
    if (typeof onChange === 'function') {
      onChange(value, event)
    }
  }

  return !isLoading ? (
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
        allowClear={allowClear}
        onSearch={handleSearch}
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
}
