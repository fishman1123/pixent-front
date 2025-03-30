// App.jsx
import React, { useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import { RouterList } from "./RouterList.jsx";
import AuthInitializer from "./components/AuthInitializer";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorModal from "./components/ErrorModal";

import "./index.css";
import "flowbite";
import "./i18n";
import { LoadingData } from "./components/pages/LoadingData.jsx";

const router = createBrowserRouter(RouterList);
const queryClient = new QueryClient();

function setScreenSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.classList.add("scrollbar-hide");
}

function App() {
  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", setScreenSize);
    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);

  return (
    // <div className="overflow-y-scroll scrollbar-hide h-screen">
    <div className=" scrollbar-hide h-screen">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingData />}>
              <AuthInitializer>
                <div>
                  <RouterProvider router={router} />
                </div>
              </AuthInitializer>
            </Suspense>
          </ErrorBoundary>
          <ErrorModal />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
