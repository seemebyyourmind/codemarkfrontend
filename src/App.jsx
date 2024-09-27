import { store } from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes/configRouter.jsx";

export default function App() {
  
  return (
    
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
