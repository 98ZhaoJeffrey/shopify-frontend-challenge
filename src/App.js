import {
  Center
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <Center w='100vw' height='100vh'>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </Router>
    </Center>
  );
};

export default App;
