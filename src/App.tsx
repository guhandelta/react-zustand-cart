import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProductsList, Cart , Root } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ProductsList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
/*
 * The Provider and Store are not necessary
 * unless you want some initialization and different states for subtrees
 * https://docs.pmnd.rs/zustand/previous-versions/zustand-v3-create-context#migration
 */

function App() {
  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      {/* </Provider> */}
    </React.StrictMode>
  );
}

export default App;