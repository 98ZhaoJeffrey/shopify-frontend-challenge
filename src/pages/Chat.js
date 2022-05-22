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
import { addDoc, doc, setDoc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

const bots = [
    "Davinci",
    "Curie",
    "Babbage",
    "Ada"
];

const Chat = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [currentBot, setCurrentBot] = useState();
    const [botMessage, setBotMessage] = useState({});
    const [messages, setMessages] = useState([{'message': 'hello world I am bot', 'sender': true}]);
    const inputRef = useRef(null);
    const messagesRef = useRef(null);
    
    const createUserRefs = async () => {
        const refs = {};
        for (var i = 0; i < bots.length; i++){
            const newDoc = await addDoc(collection(db, 'chats'), {});
            await setDoc(doc(newDoc, 'messages', 'messages'), {});
            refs[bots[i]] = doc(db, 'chats', newDoc.id);
        }
        return refs;
    };

    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setBotMessage(docSnap.data());
            } else {
                const messageRefs = await createUserRefs();
                await setDoc(docRef, messageRefs);
                setBotMessage(messageRefs);
            }
        }
        getData();
    }, []);

    const updateMessages = async () => {
        if(currentBot && botMessage){
            const q = query(collection(botMessage[currentBot], "messages"), 
                orderBy('createdAt'), 
                limit(25)
            );
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs.map((doc) => { return doc.data() }));
            setMessages(querySnapshot.docs.map((doc) => { return doc.data() }));
        }
    }

    useEffect(() => {
        updateMessages();
    }, [currentBot, botMessage])

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages]);

    const sendMessage = async () => {
        if(inputRef.current.value){
            await addDoc(collection(botMessage[currentBot], 'messages'), {
                'message': inputRef.current.value,
                'createdAt': Date.now(),
                'userSent': true
            });
            await updateMessages();
            inputRef.current.value = '';
        }
    };

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
                {botMessage && Object.keys(botMessage).map((name) => {
                    return (
                        <NavItem 
                            name={name} 
                            setCurrentBot={setCurrentBot}
                        />
                    )
                })}
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
                    {messages && messages.map((message, id) => { 
                        return <Message id={id} message={message.message} sender={message.userSent}/>
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