import { Intro } from './components/pages/Intro.jsx';
import { Input } from './components/pages/Input.jsx';
import SecuredRoute from "./components/SecuredRoute.jsx";
import { InfoInput } from "./components/pages/InfoInput.jsx";
import { InfoInputTwo } from "./components/pages/InfoInputTwo.jsx";
import { WrongPath } from "./components/pages/WrongPath.jsx";
import { ResultPage } from "./components/pages/ResultPage.jsx";
import { MainLayout } from "./components/layout/MainLayout.jsx";
import { ResultLayout } from "./components/layout/ResultLayout.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx";
import { Preference } from "./components/pages/Preference.jsx";
import { ReportViewer } from "./components/pages/ReportViewer.jsx";
import { ReportViewerResult } from "./components/pages/ReportViewerResult.jsx";
import { Admin } from "./components/pages/Admin.jsx";
import { PrintReport } from "./components/pages/PrintReport";
import Loading from "./components/pages/Loading.jsx";
import { ReportSummary } from "./components/pages/ReportSummary";
import { LoginPage } from "./components/pages/LoginPage";
import { LoginRedirectPage } from "./components/pages/LoginRedirectPage";
import { NicknamePage } from "./components/pages/NicknamePage";
import Test from "./components/summary/Test";
import TestTwo from "./components/summary/TestTwo";

export const RouterList = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Intro />,
            },
            {
                path: 'login',
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                    {
                        path: 'nickname',
                        element: <NicknamePage />,
                    },
                ],
            },
            {
                path: 'oauth2/login/redirect',
                element: <LoginRedirectPage />,
            },
            {
                children: [
                    {
                        path: '',
                        element: (
                            <SecuredRoute>
                                <MainLayout />
                            </SecuredRoute>
                        ),
                        children: [
                            {
                                path: 'basic',
                                element: <Input />,
                            },
                            {
                                path: 'which',
                                element: <Preference />,
                            },
                            {
                                path: 'input',
                                element: <InfoInput />,
                            },
                            {
                                path: 'inputTwo',
                                element: <InfoInputTwo />,
                            },
                            {
                                path: '🌚',
                                element: <Admin />,
                            },
                            {
                                path: 'loading',
                                element: <Loading />,
                            },
                            {
                                path: 'test',
                                element: <ReportSummary />,
                            },
                            {
                                path: 'testTwo',
                                element: <TestTwo />,
                            },
                            {
                                path: 'report',
                                element: <ReportViewer />,
                                children: [
                                    {
                                        path: ':id',
                                        element: <ReportViewerResult />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'result',
                        element: <ResultLayout />,
                        children: [
                            {
                                index: true,
                                element: <ResultPage />,
                            },
                            {
                                path: 'reportsummary',
                                element: <ReportSummary />,
                            },
                        ],
                    },
                    {
                        path: 'summary',
                        element: <PrintReport />,
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
