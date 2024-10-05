// RouterList.jsx

import { Layout } from './components/Layout.jsx';
import { Intro } from './components/pages/Intro.jsx';
import { Input } from './components/pages/Input.jsx';
import SecuredRoute from "./components/SecuredRoute.jsx";
import {InfoInput} from "./components/pages/InfoInput.jsx";
import {Modal} from "./components/Modal.jsx";

export const RouterList = [
    {
        path: '/',
        element: (
                <Layout />
        ),
        children: [
            {
                index: true,
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
            {
                path: 'input',
                element: <SecuredRoute><InfoInput/></SecuredRoute>
            },
            {
                path: 'inputTwo',
                element: <SecuredRoute><InfoInput/></SecuredRoute>
            },

        ],
    },
];
