import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>UCUBE</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=yes"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
    </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
