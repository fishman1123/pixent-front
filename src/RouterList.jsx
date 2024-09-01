import { Layout } from "./components/Layout.jsx";
import { Intro } from "./components/pages/Intro.jsx";
import { Input } from "./components/pages/Input.jsx";
import SecuredRoute from './components/SecuredRoute';

export const RouterList = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Intro />,
            },
        ],
    },
    {
        path: "/",
        element: (
            // <SecuredRoute>
                <Layout />
            //</SecuredRoute>
        ),
        children: [
            {
                path: "basic",
                element: <Input />,
            }
        ]
    }
];
