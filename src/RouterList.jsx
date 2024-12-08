// RouterList.jsx

import { Intro } from './components/pages/Intro.jsx';
import { Input } from './components/pages/Input.jsx';
import SecuredRoute from "./components/SecuredRoute.jsx";
import { InfoInput } from "./components/pages/InfoInput.jsx";
import { Modal } from "./components/Modal.jsx";
import { InfoInputTwo } from "./components/pages/InfoInputTwo.jsx";
import { WrongPath } from "./components/pages/WrongPath.jsx";
import { ResultPage } from "./components/pages/ResultPage.jsx";
import { MainLayout } from "./components/layout/MainLayout.jsx";
import { ResultLayout } from "./components/layout/ResultLayout.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx"; // Import AppLayout
import LoadingAnimation from "./components/pages/Loading.jsx";
import {Preference} from "./components/pages/Preference.jsx";
import {ReportViewer} from "./components/pages/ReportViewer.jsx";
import {ReportViewerResult} from "./components/pages/ReportViewerResult.jsx";
import { AdminRoute } from "./components/SecuredRoute.jsx";
import {Admin} from "./components/pages/Admin.jsx";

export const RouterList = [
    {
        path: '/',
        element: <AppLayout />, // Use AppLayout as the top-level layout
        children: [
            {
                element: <MainLayout />, // Nest MainLayout
                children: [
                    {
                        index: true,
                        element: <Intro />,
                    },
                    {
                        path: 'basic',
                        element: <Input />,
                    },
                    {
                        path: 'which',
                        element: (
                            <SecuredRoute>
                                <Preference />
                            </SecuredRoute>
                        ),
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
                    {
                        path: '🌚',
                        element: (
                            <Admin />
                        )
                    },
                    {
                        path: 'loading',
                        element: (
                            <LoadingAnimation />
                        ),
                    },
                    {
                        path: 'report',
                        element: (
                            <ReportViewer/>
                        ),
                        children: [
                            {
                                path: ':id',
                                element: (
                                    <ReportViewerResult /> // Optionally a different or enhanced version
                                )
                            }
                        ]
                    }

                ],
            },
            {
                element: <ResultLayout />,
                children: [
                    {
                        path: 'result',
                        element: (
                            <SecuredRoute>
                                <ResultPage />
                            </SecuredRoute>
                        ),
                    },
                ],
            },


            {
                path: '*',
                element: <WrongPath />,
            },
        ],
    },
];
