// pages/_app.js
import React, { useEffect } from 'react'
import { AppProps } from 'next/app'

function Cita({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/docs' })
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return <Component {...pageProps} />
}

export default Cita