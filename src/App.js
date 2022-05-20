import {
  Center
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Center w='100vw' height='100vh'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/chat" element={
              <PrivateRoute>
                  <Chat/>
              </PrivateRoute>
            }/>
          </Routes>
        </AuthProvider>
      </Router>
    </Center>
  );
};

export default App;
