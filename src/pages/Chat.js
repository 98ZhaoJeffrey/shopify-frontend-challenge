import { useState, useRef, useEffect, useContext } from 'react';
import {
    VStack,
    Flex,
    Input,
    IconButton,
    Text,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import NavItem from '../components/NavItem';
import Message from '../components/Message';
import { AuthContext } from '../contexts/AuthContext';

const Chat = () => {
    const { logout } = useContext(AuthContext);
    const [messages, setMessages] = useState([{'message': 'hello world I am bot', 'sender': true}]);
    const inputRef = useRef(null);
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages]);

    const sendMessage = () => {
        if(inputRef.current.value){
            setMessages([...messages, {'message': inputRef.current.value, 'sender': 'true'}]);
            inputRef.current.value = '';
        }
    } 

    return (
        <Flex w='100%' h='100%' flexDirection='row'>
            <Flex 
                h='100%'
                w='20%'
                as='nav'
                flexDirection='column'
                bg='gray.100'
                gap='2'
                overflow='auto'
            >   
                <Text fontSize='2xl' ml='2' color='black' fontWeight='semibold'>NBA Talks</Text>
                <NavItem name='Chat Bot 1'/>
                <NavItem name='Chat Bot 2'/>
                <NavItem name='Chat Bot 3'/> 
                <NavItem name='Chat Bot 4'/> 
                <Button 
                    colorScheme='red'
                    onClick={logout}
                >
                    Logout
                </Button>
                <IconButton
                    aria-label='Shrink Bar'
                    onClick={() => console.log('Shrink Bar')}
                    icon={<ArrowLeftIcon/>}
                    w='4'
                    mr='4'
                    alignSelf='end'
                    mt='auto'
                />
            </Flex>
            <Flex w='100%' h='100%' flexDirection='column' >
                <VStack overflow='auto' ref={messagesRef}>
                    {messages && messages.map((message) => { 
                        return <Message message={message.message} sender={message.sender}/>
                    })}
                </VStack>
                <InputGroup size='lg' w='full' mt='auto'>
                    <Input
                        ref={inputRef} 
                        pr='16' 
                        placeholder='Ask me anything'
                        onKeyDown={(event) => {
                            event.key === 'Enter' && sendMessage();
                        }}
                    />
                    <InputRightElement width='16'>
                        <Button 
                            colorScheme='blue' 
                            onClick={sendMessage}
                        >
                            Send
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    );
};

export default Chat;