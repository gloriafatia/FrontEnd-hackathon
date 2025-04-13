import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div>
     <Header/>
     <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
      <Outlet/>
     </main>

    </div>
    </AuthProvider>
  );
}

export default App;
