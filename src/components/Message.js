import {
    Flex,
    Box,
    Text,
    Avatar
} from '@chakra-ui/react';

const Message = (props) => {
    return (
        <Flex                 
            alignSelf={props.sender ? 'flex-end': 'flex-start'}
            alignItems='center'
            flexDirection={props.sender ? 'row': 'row-reverse'}
            w="auto"
            gap='4'
            py='2'
            px='4'
            maxW="70%"
        >
            <Box
                minh="10%"
                py="4" 
                px="2" 
                rounded='md' 
                bg={props.sender ? 'green.200' : 'cyan.200'}
            >
                <Text>{props.message}</Text>
            </Box>
            <Avatar size='sm' name={props.name} src=''/>
        </Flex>
    )
}

export default Message;