import { useState, useRef, useEffect, useContext } from 'react';
import {
    VStack,
    Flex,
    Input,
    Text,
    InputGroup,
    InputRightElement,
    Button,
    Center,
    Box
} from '@chakra-ui/react';
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
    const [waiting, setWaiting] = useState(false);
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
            setMessages(querySnapshot.docs.map((doc) => { return doc.data() }));
        }
    }

    const queryAI = async (prompt) => {
        const engine = {
            'Davinci': 'text-davinci-002',
            'Curie':'text-curie-001',
            'Babbage': 'text-babbage-001',
            'Ada': 'text-ada-001'
        };
        const data = {
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };
        try{
            setWaiting(true);
            console.log(engine[currentBot]);
            console.log(`https://api.openai.com/v1/engines/${engine[currentBot]}/completions`)
            const response = await fetch(`https://api.openai.com/v1/engines/${engine[currentBot]}/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
                },
                body: JSON.stringify(data),
            });
            setWaiting(false);
            return response;
        }
        catch (error) {
            console.log(error);
        }  
    }

    useEffect(() => {
        updateMessages();
    }, [currentBot, botMessage])

    useEffect(() => {
        if(messagesRef.current){
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        } 
    }, [messages]);

    const sendMessage = async () => {
        if(inputRef.current.value){
            try{
                console.log(botMessage[currentBot]);
                await addDoc(collection(botMessage[currentBot], 'messages'), {
                    'message': inputRef.current.value,
                    'createdAt': Date.now(),
                    'userSent': true
                });
                await updateMessages();
                const response = await queryAI(inputRef.current.value);
                const result = await response.json();
                await addDoc(collection(botMessage[currentBot], 'messages'), {
                    'message': result['choices'][0]['text'],
                    'createdAt': Date.now(),
                    'userSent': false
                });
                await updateMessages();
                inputRef.current.value = ''; 
            }
            catch(error){
                console.log(error);
            }
        }
    };

    return (
        <Flex w='100%' h='100%' flexDirection='row'>
            <Flex 
                h='100%'
                w={{'base': '25%', 'lg': '20%'}}
                as='nav'
                flexDirection='column'
                bg='gray.100'
            >
                <Flex 
                    flexDirection='column'
                    gap='2'
                    overflow='auto'
                    alignItems={{'base' : 'center', 'md': 'start'}}
                >   
                    <Text fontSize='2xl' ml='2' color='black' fontWeight='semibold'>Chat</Text>
                    {botMessage && Object.keys(botMessage).map((name) => {
                        return (
                            <NavItem 
                                name={name} 
                                setCurrentBot={setCurrentBot}
                            />
                        )
                    })}
                </Flex>
                <Button 
                    colorScheme='red'
                    onClick={logout}
                    w='100%'
                    mt='auto'
                >
                    Logout
                </Button>
            </Flex>
            { currentBot === undefined ? <Center w='100%'>
                    <Text fontSize={{'base' : 'xl', 'md': '2xl'}}>Click on one of the bots to see your messages</Text>
                </Center> 
                 : <Flex w='100%' h='100%' flexDirection='column' >
                    <Box             
                        boxShadow='md'
                    >
                        <Text fontSize='2xl'>{currentBot}</Text>
                    </Box>
                    <VStack overflow='auto' ref={messagesRef}>
                        {messages && messages.map((message, id) => { 
                            return <Message id={id} message={message.message} sender={message.userSent}/>
                        })}
                    </VStack>
                    {waiting && <Text color='blue' mx='6' mb='2'>{currentBot} is thinking...</Text>}
                    <InputGroup size='lg' w='full' mt='auto'>
                        <Input
                            ref={inputRef} 
                            pr='16' 
                            placeholder='Ask me anything'
                            onKeyDown={(event) => {
                                event.key === 'Enter' && sendMessage();
                            }}
                            isDisabled={waiting}
                        />
                        <InputRightElement width='16'>
                            <Button 
                                colorScheme='blue' 
                                onClick={sendMessage}
                                isDisabled={waiting}
                            >
                                Send
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>}
        </Flex>
    );
};

export default Chat;