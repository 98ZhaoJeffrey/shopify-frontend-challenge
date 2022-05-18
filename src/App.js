import {
  Flex
} from '@chakra-ui/react';
import Login from './pages/Login';

function App() {
  return (
    <Flex w='100vw' height='100vh' justifyContent='center' alignItems='center'>
      <Login />
    </Flex>
  );
}

export default App;
