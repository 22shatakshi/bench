import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthContextProvider>
    <Navbar />
    <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
