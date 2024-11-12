import React, { render, screen } from "@testing-library/react";

import { it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "../src/App";

const queryClient = new QueryClient();

it("renders without crashing", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  const location = await screen.findByText(/new york/i);

  expect(location).toBeInTheDocument();
});
