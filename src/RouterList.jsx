// RouterList.jsx

import { Layout } from './components/Layout.jsx';
import { Intro } from './components/pages/Intro.jsx';
import { Input } from './components/pages/Input.jsx';
import SecuredRoute from "./components/SecuredRoute.jsx";
import { InfoInput } from "./components/pages/InfoInput.jsx";
import { Modal } from "./components/Modal.jsx";
import { InfoInputTwo } from "./components/pages/InfoInputTwo.jsx";
import { WrongPath } from "./components/pages/WrongPath.jsx";

export const RouterList = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Intro />,
            },
            // Wildcard route for handling unknown paths under '/'
            {
                path: '*',
                element: <WrongPath />,
            },
        ],
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'basic',
                element: <Input />,
            },
            {
                path: 'input',
                element: (
                    <SecuredRoute>
                        <InfoInput />
                    </SecuredRoute>
                ),
            },
            {
                path: 'inputTwo',
                element: (
                    <SecuredRoute>
                        <InfoInputTwo />
                    </SecuredRoute>
                ),
            },
            // Wildcard route for handling unknown paths under '/basic', '/input', etc.
            {
                path: '*',
                element: <WrongPath />,
            },
        ],
    },
    {
        path: '/result',
        element: <Layout />,
        children: [
            {
                index: true, // Changed from path: '' to index for consistency
                element: <Input />,
            },
            {
                path: 'input',
                element: (
                    <SecuredRoute>
                        <InfoInput />
                    </SecuredRoute>
                ),
            },
            {
                path: 'inputTwo',
                element: (
                    <SecuredRoute>
                        <InfoInputTwo />
                    </SecuredRoute>
                ),
            },
            // Wildcard route for handling unknown paths under '/result'
            {
                path: '*',
                element: <WrongPath />,
            },
        ],
    },
    // Optional: Global wildcard route for any other undefined paths
    {
        path: '*',
        element: <WrongPath />,
    },
];
