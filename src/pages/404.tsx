import { Button, Result } from "antd";
import Router from 'next/router'
import Icon from '@ant-design/icons';

import Svg404 from '../assets/404.svg'

export default function Error404Page() {
  return (
    <Result
      icon={<Icon component={() => <Svg404 width="8em" />} />}
      title="Página não encontrada"
      subTitle="A página que você está tentando acessar não existe"
      extra={<Button type="primary" onClick={() => Router.back()}>Voltar</Button>}
    />
  )
}
