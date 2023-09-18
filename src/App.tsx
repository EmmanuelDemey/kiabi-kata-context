import { Suspense, lazy, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PeopleLikeContextType, PeopleLikeProvider } from "./context";
const PersonPage = lazy(() => import("./pages/Person"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Home></Home>,
  },
  {
    path: "person/:id",
    element: (
      <Suspense>
        <PersonPage></PersonPage>
      </Suspense>
    ),
  },
]);

function App() {
  const [people, setPeople] = useState<string[]>([]);

  const peopleLikeProviderValue: PeopleLikeContextType = {
    person: people,
    like: function (url: string): void {
      setPeople([...people, url]);
    },
    dislike: function (url: string): void {
      setPeople(people.filter((p) => p !== url));
    },
    isLiked: function (url: string): boolean {
      return people.includes(url);
    },
  };

  return (
    <PeopleLikeProvider value={peopleLikeProviderValue}>
      <RouterProvider router={router}></RouterProvider>
    </PeopleLikeProvider>
  );
}

export default App;
