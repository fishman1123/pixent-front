// RouterList.jsx

import { Layout } from './components/Layout.jsx';
import { Intro } from './components/pages/Intro.jsx';
import { Input } from './components/pages/Input.jsx';

export const RouterList = [
    {
        path: '/',
        element: (
                <Layout />
        ),
        children: [
            {
                index: true, // Using 'index: true' for the default route
                element: <Intro />,
            },
        ],
    },
    {
        path: '/',
        element: (
                <Layout />
        ),
        children: [
            {
                path: 'basic',
                element: <Input />,
            },
        ],
    },
];
