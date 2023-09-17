import "./App.css";
import BodyContainer from "./components/BodyContainer";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
