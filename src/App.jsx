import { Outlet } from "react-router-dom";
import Navigation from "./Components/ui/NavigationBar/Navigation";

const App = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default App;
