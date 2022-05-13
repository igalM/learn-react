import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/auth-context";
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios, { AxiosRequestConfig } from "axios";
import { storage } from "./utils/utils";

axios.defaults.baseURL = process.env.REACT_APP_API_URI;

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if(!config.headers) return config;
  if(storage.getToken()) {
    config.headers.Authorization = `Bearer ${storage.getToken()}`;
  }
  return config;
}

axios.interceptors.request.use(onRequest);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout />
          <ReactQueryDevtools initialIsOpen />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
