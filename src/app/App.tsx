import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { GameId } from "../components/Game";
import Sport from '../components/Sport';

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
