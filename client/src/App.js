import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="App" style={{ heigth: "100vh" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
