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
            const result = await emailLogin(emailRef.current.value, passwordRef.current.value);
            console.log(result);
            //navigate('/chat');
        }catch(error){
            setError(error.message)
        }
    }
    
    return(
        <VStack 
            h='auto'
            width={{base: '90%', md: '70%', lg:'40%', xl: '35%'}} 
            spacing={4}
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            boxShadow={{ base: 'none', sm: 'md'}}
            borderRadius={{ base: 'none', sm: 'xl' }}
        >
            
            <Heading as='h1' color='red'> <Text as='span' color='blue'>NBA</Text> Talks</Heading>
            <Text>The objective way to rate your NBA take again</Text>
            <Button variant='link'><Link to='/signup'>Need an account?</Link></Button>
            <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input ref={emailRef} id='email' type='email'></Input>
            </FormControl>
            <PasswordField ref={passwordRef} error={error}/>
            <Button variant='link'><Link to='/reset'>Forgot your password?</Link></Button>
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