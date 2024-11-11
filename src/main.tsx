import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "./App.tsx";
import { AppFallback } from "./components";

import "./index.css";

const queryClient = new QueryClient();

const rootElement: HTMLElement | null = document.getElementById("root");

try {
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense
              fallback={
                <div>
                  <AppFallback />
                </div>
              }
            >
              <App />
            </Suspense>
          </Router>
        </QueryClientProvider>
      </StrictMode>
    );
  }
} catch (error) {
  throw new Error(`Could not find root element. Error: ${error}`);
}
