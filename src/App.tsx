import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import "primeicons/primeicons.css";
import Loading from "./components/base/Loading";
import { router } from "./router";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
