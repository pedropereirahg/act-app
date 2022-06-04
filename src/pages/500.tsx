import { Button, Result } from "antd";
import Router from 'next/router'
import Icon from '@ant-design/icons';

import Svg500 from '../assets/500.svg'

export default function Error500Page() {
  return (
    <Result
      icon={<Icon component={() => <Svg500 width="8em" />} />}
      title="Oops... Algo não está certo"
      subTitle="Houve um erro interno no servidor, desculpe o transtorno"
      extra={<Button type="primary" onClick={() => Router.back()}>Voltar</Button>}
    />
  )
}
