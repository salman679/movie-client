import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import SearchProvider from "./providers/SearchProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </ThemeProvider>
    </SearchProvider>
  </StrictMode>
);
