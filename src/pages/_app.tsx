import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'

import './globals.css'

export default function ActivityApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
