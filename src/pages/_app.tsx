import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import LoginModal from '@/components/LoginModal'
import {Provider} from 'react-redux'
import { store } from '../../store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Provider store={store}>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </>
  )
}
 