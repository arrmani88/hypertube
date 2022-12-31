import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
	<QueryClientProvider client={queryClient} >
		<Provider store={store} >
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</QueryClientProvider>
);

