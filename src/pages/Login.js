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
import {FcGoogle} from 'react-icons/fc';
import { AuthContext } from '../contexts/AuthContext';
import PasswordField from '../components/PasswordField';

const Login = () => {
    const navigate = useNavigate();
    const { googleLogin, emailLogin } = useContext(AuthContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try{
            await googleLogin();
            navigate('/chat');
        }catch(error){
            setError(error);
        }
    } 

    const handleEmailLogin = async () => {
        try{
            console.log(emailRef.current.value)
            await emailLogin(emailRef.current.value, passwordRef.current.value);
            navigate('/chat');
        }catch(error){
            setError(error.message)
        }
    }
    
    return(
        <VStack 
            width='30%' 
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
            <Link to='/signup'><Text color='blue'>Need an account?</Text></Link>
            <Button colorScheme='blue' w='100%' onClick={handleEmailLogin}>Login</Button>
            <Button                  
                variant='outline' 
                size='lg' 
                fontSize='lg' 
                w='100%' 
                leftIcon={<FcGoogle />}
                aria-label={'Google'}
                onClick={handleGoogleLogin}
            >
                Continue with Google
            </Button>
        </VStack>
    );
};

export default Login;