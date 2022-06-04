import Head from 'next/head';

export default function Metadata({ title }: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="App de atividades" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
};
