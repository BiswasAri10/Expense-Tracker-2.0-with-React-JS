import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './auth-store/AuthContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  );
  
