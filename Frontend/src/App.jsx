import Routing from "./routes/Router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
const App = () => {
  return (
    <AuthProvider>
      <Routing />;
    </AuthProvider>
  );
};

export default App;
