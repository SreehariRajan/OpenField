// import type { AppProps } from 'next/app'
import "../styles/global.css";
import { ContextProvider } from '../context/Context'
import NavBar from '../components/navbar'

export default function App({ Component, pageProps }) {
    return (
        <div>
            <ContextProvider>

                <Component {...pageProps} />
            </ContextProvider>
        </div>

    )
}