// src/RouterList.js
import React from "react";
import { Intro } from "./components/intro/Intro.jsx";
import { Input } from "./components/input/Input.jsx";
import { InfoInput } from "./components/inputInfo/InfoInput.jsx";
import { InfoInputTwo } from "./components/pages/InfoInputTwo.jsx";
import { WrongPath } from "./components/pages/WrongPath.jsx";
import { ResultPage } from "./components/pages/ResultPage.jsx";
import { ResultLayout } from "./components/layout/ResultLayout.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx";
import { Preference } from "./components/pages/Preference.jsx";
import { ReportViewer } from "./components/pages/ReportViewer.jsx";
import { ReportViewerResult } from "./components/pages/ReportViewerResult.jsx";
import { Admin } from "./components/admin/Admin.jsx";
import { PrintReport } from "./components/pages/PrintReport";
import Loading from "./components/pages/Loading.jsx";
import { ReportSummary } from "./components/pages/ReportSummary";
import { LoginPage } from "./components/pages/LoginPage";
import { LoginRedirectPage } from "./components/pages/LoginRedirectPage";
import { NicknamePage } from "./components/nickname/NicknamePage";
import Test from "./components/summary/Test";
import TestTwo from "./components/summary/TestTwo";
import { ProtectedLayout } from "./components/layout/ProtectedLayout";
import { UserPage } from "./components/myPage/UserPage.jsx";
import { Collection } from "./components/collection/Collection.jsx";
import { FeedBackPage } from "./components/feedback/FeedBackPage.jsx";
import { FeedBackChart } from "./components/FeedBackChart.jsx";
import { FeedBackDetailPage } from "./components/feedback/FeedBackDetailPage.jsx";
import { AnalysisRequest } from "./components/AnalysisRequest.jsx";
import AuthInitializer from "./components/AuthInitializer.jsx";
import { AdditionalFeedBackPage } from "./components/feedback/AdditionalFeedBackPage.jsx";
import { AdminUsers } from "./components/admin/AdminUsers.jsx";
import { AddOriginPage } from "./components/addOrigin/AddOriginPage.jsx";
import { ValidationPage } from "./components/validation/ValidationPage.jsx";
import { AddOptionToastContent } from "./components/addOption/AddOptionToastContent.jsx";
import { PrintReportTemplate } from "./components/pages/PrintReportTemplate.jsx";

export const RouterList = [
  {
    path: "/",
    element: <AppLayout />, // top layout
    children: [
      // index ("/")
      {
        index: true,
        element: <Intro />,
      },
      {
        path: "login",
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: "nickname",
            element: <NicknamePage />,
          },
        ],
      },
      {
        path: "oauth2/login/redirect",
        element: <LoginRedirectPage />,
      },
      {
        path: "report",
        element: <ReportViewer />,
        children: [
          {
            path: ":id",
            element: <ReportViewerResult />,
          },
          {
            path: "*",
            element: <WrongPath />,
          },
        ],
      },

      // -- ALL secured ROUTES UNDER /secured/*
      {
        path: "secured",
        element: <ProtectedLayout />,
        children: [
          { path: "basic", element: <Input /> },
          { path: "which", element: <Preference /> },
          { path: "input", element: <InfoInput /> },
          { path: "inputTwo", element: <InfoInputTwo /> },
          { path: "🌚", element: <Admin /> },
          { path: "🌝", element: <AdminUsers /> },
          { path: "loading", element: <Loading /> },
          { path: "test", element: <ReportSummary /> },
          { path: "dummy", element: <AnalysisRequest /> },
          { path: "testTwo", element: <TestTwo /> },
          { path: "charge", element: <AnalysisRequest /> },
          {
            path: "user",
            children: [
              {
                index: true,
                element: <UserPage />,
              },
            ],
          },
          {
            path: "collection",
            children: [
              {
                index: true,
                element: <Collection />,
              },
              {
                path: "option",
                element: <AddOptionToastContent />,
              },
              {
                path: "add",
                element: <NicknamePage />,
              },
              {
                path: "addOrigin",
                element: <AddOriginPage />,
              },
              {
                path: "validation",
                element: <ValidationPage />,
              },
            ],
          },
          {
            path: "feedback",
            children: [
              {
                index: true,
                element: <FeedBackPage />,
              },
              {
                path: "variation",
                element: <AdditionalFeedBackPage />,
              },
              {
                path: ":id",
                element: <FeedBackDetailPage />,
              },
            ],
          },
        ],
      },

      {
        path: "result",
        element: <ResultLayout />,
        children: [
          {
            index: true,
            element: <ResultPage />,
          },
          {
            path: "reportsummary",
            element: <ReportSummary />,
          },
        ],
      },
      {
        path: "summary",
        element: <PrintReport />,
      },
      {
        path: "print",
        element: <PrintReportTemplate />,
      },
      {
        path: "*",
        element: <WrongPath />,
      },
    ],
  },
];
