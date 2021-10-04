import NoticeProvider from '@context/notice'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="root">
      <NoticeProvider>
        <Component {...pageProps} />
      </NoticeProvider>
    </div>
  )
}

export default MyApp
