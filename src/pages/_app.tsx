import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import {Provider} from 'react-redux'
import { store } from '../../store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Provider store={store}>
      <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </>
  )
}
 