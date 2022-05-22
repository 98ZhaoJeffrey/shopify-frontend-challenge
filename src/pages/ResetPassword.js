import { useContext, useRef, useState } from 'react';
import {
    VStack,
    Input,
    Button,
    FormControl,
    FormLabel,
    Heading,
    FormErrorMessage,
    Box,
    useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ResetPassword = () => {
    const emailRef = useRef(null);
    const { resetPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await resetPassword(emailRef.current.value);
            toast({
                title: 'Link sent',
                description: 'Check your email for the reset link',
                status: 'success',
                position: 'bottom',
                duration: 5000,
                isClosable: true,
            });
        }catch (error){
            setError(error.message);
        }
        emailRef.current.value = '';
        setIsLoading(false);
    }

    return (
        <VStack
        textAlign='center' 
            w={{base: '70%', lg: 'lg'}}
            h='100%'
            spacing={8}
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
        >
            <Heading as='h1'>
                Forgot your password?
            </Heading>
            <Box 
                as='form' 
                onSubmit={handleSubmit} 
                display='flex'
                flexDirection='column' 
                gap={8}
                w='100%'
            >
                <FormControl isInvalid={error}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input type='email' id='email' ref={emailRef} placeholder="firstname@lastname.com" />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>
                <Button 
                    loading={isLoading}
                    colorScheme='blue'
                    w='100%' 
                    type='submit'
                > 
                    Send reset link 
                </Button>
                <Button variant='link'><Link to='/'>Back to login</Link></Button>
            </Box>
        </VStack>

    );
};

export default ResetPassword;