import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Sport from '../components/Sport';
import { GameId } from "../components/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sport />,
    children: [
      {
        path: ":gameId",
        element: <GameId />,
      },
    ],
  },
]);


function App() {

  return (
    <RouterProvider router={router} />
    );
}

export default App;
