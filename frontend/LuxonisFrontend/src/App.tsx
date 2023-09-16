import "./App.css";
import BodyContainer from "./components/BodyContainer";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//dostylovat tlačítka, loading dostylovat, page dostylovat a vyřešit localstorage at se to nevolá tak často (ted se to voláxy krát)
// dořešit nějakej styling jeste
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <BodyContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
