import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Cita',
        short_name: 'Cita',
        description: 'The easiest way to create and share your appointments.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/screenshot_lg.png',
                sizes: '1920x1080',
                type: 'image/png',
            },
            {
                src: '/screenshot_sm.png',
                sizes: '1280x720',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}