import { forwardRef } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useBoolean,
    IconButton,
    InputRightElement, 
    InputGroup
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi'


const PasswordField = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useBoolean();
    return (
        <FormControl isInvalid={props.error}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    required 
                    id='password'
                    ref={ref}
                >
                </Input>
                <InputRightElement>
                    <IconButton
                        variant='link'
                        icon={showPassword ? <HiEyeOff/> : <HiEye/>}
                        aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                        onClick={setShowPassword.toggle}
                    />
                </InputRightElement>
            </InputGroup>
            {props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
        </FormControl>

    );
});

export default PasswordField;