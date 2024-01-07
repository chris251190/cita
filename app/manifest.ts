import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Cita',
        short_name: 'Cita',
        id: 'com.cita.app',
        description: 'The easiest way to create and share your appointments.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#f97316',
        categories: ['business', 'productivity'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/android-launchericon-512-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/android-launchericon-144-144.png',
                sizes: '144x144',
                type: 'image/png',
            },
            {
                src: '/android-launchericon-512-512.png', 
                sizes: '512x512', 
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/android-launchericon-512-512.png', 
                sizes: '512x512', 
                type: 'image/png', 
                purpose: 'any'
            },
        ],
        screenshots: [
            {
                src: '/screen_lg.png',
                sizes: '1920x1080',
                type: 'image/png',
            },
            {
                src: '/screen_m.png',
                sizes: '1280x720',
                type: 'image/png',
            },
            {
                src: '/screen_sm.png',
                sizes: '640x320',
                type: 'image/png',
            },
        ],
        orientation: 'any',
        scope: '/',
        prefer_related_applications: false,
    }
}