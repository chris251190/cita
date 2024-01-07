// pages/_app.js
import React from 'react'
import App from 'next/app'

class Cita extends App {
    componentDidMount() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                }, function (err) {
                    console.log('Service Worker registration failed: ', err);
                });
            });
        }
    }

    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default Cita