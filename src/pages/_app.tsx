import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { setTwoToneColor } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import './globals.css'

setTwoToneColor(`${cyan.primary}`);

export default function ActivityApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
