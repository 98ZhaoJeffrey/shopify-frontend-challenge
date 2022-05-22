import { useState, useRef, useContext } from 'react';
import {
    VStack,
    Input,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PasswordField from '../components/PasswordField';

const Login = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState('');

    const handleEmailSignup = async () => {
        try{
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/chat');
        }catch(error){
            setError(error.message)
        }
    }
    
    return(
        <VStack 
            width={{base: '90%', md: '70%', lg:'40%', xl: '30%'}} 
            spacing={8}
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            boxShadow={{ base: 'none', sm: 'md'}}
            borderRadius={{ base: 'none', sm: 'xl' }}
        >
            <Heading as='h1' color='red'> <Text as='span' color='blue'>NBA</Text> Talks</Heading>
            <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input ref={emailRef} id='email' type='email'></Input>
            </FormControl>
            <PasswordField ref={passwordRef} error={error}/>
            <Button variant='link'><Link to='/'>Have an account?</Link></Button>
            <Button colorScheme='blue' w='100%' onClick={handleEmailSignup}>Signup</Button>
        </VStack>
    );
};

export default Login;