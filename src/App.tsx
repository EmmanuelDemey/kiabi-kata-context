import {Suspense, lazy} from "react";
import "./App.css";
import {Home} from "./pages/Home";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
const PersonPage = lazy(() => import("./pages/Person"));

const router = createBrowserRouter([
  {
    path: '',
    element: <Home></Home>
  },
  {
    path: 'person/:id',
    element: (
      <Suspense>
        <PersonPage></PersonPage>
      </Suspense>
    )
  }
])


function App() {
  return (
      <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
