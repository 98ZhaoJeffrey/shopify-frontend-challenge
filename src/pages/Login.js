import {
    VStack,
    Input,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Text,
} from '@chakra-ui/react';
import {FcGoogle} from 'react-icons/fc';

const login = () => {
    console.log('Logged in')
}

const Login = () => {
    return(
        <VStack width='30%' spacing={8}
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        boxShadow={{ base: 'none', sm: 'md'}}
        borderRadius={{ base: 'none', sm: 'xl' }}>
            <Heading as='h1' color='red'> <Text as='span' color='blue'>NBA</Text> Talks</Heading>
            <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input id='email' type='email'></Input>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password'></Input>
            </FormControl>
            <Button colorScheme='blue' w='100%' onClick={login}>Login</Button>
            <Button                  
                variant='outline' 
                size='lg' 
                fontSize='lg' 
                w='100%' 
                leftIcon={<FcGoogle />}
                aria-label={'Google'}
            >
                Continue with Google
            </Button>
        </VStack>
    );
};

export default Login;