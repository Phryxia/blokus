import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="root">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
