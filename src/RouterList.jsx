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
import { AppLayout } from "./components/layout/AppLayout.jsx";
import LoadingAnimation from "./components/pages/Loading.jsx";
import { Preference } from "./components/pages/Preference.jsx";
import { ReportViewer } from "./components/pages/ReportViewer.jsx";
import { ReportViewerResult } from "./components/pages/ReportViewerResult.jsx";
import { Admin } from "./components/pages/Admin.jsx";
import { PrintReport } from "./components/pages/PrintReport.jsx";

export const RouterList = [
    {
        path: 'summary',
        element: <PrintReport />,
    },
    {
        path: '/',
        element: <AppLayout />, // top-level layout for main site
        children: [
            {
                element: <MainLayout />,
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
                        element: <Admin />
                    },
                    {
                        path: 'loading',
                        element: <LoadingAnimation />,
                    },
                    {
                        path: 'report',
                        element: <ReportViewer />,
                        children: [
                            {
                                path: ':id',
                                element: <ReportViewerResult />
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
    }
];
