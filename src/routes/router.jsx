import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Conversation from "../Pages/ConversationPage/Conversation";
import { mentorsData } from "../Database/mentorsData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/conversation/:mentorId",
    element: <Conversation mentors={mentorsData} />,
  },
]);

export default router;
