import {
    Flex,
    Avatar,
    AvatarBadge,
    Text,
    Tooltip
} from '@chakra-ui/react';

const NavItem = (props) => {

    return (
        <Tooltip label={props.label}>
            <Flex
                w='100%'
                py='4'
                flexDirection='row'
                alignItems='center'
                gap='4'
                rounded='md'
                _hover={{
                    bg: 'gray.200'
                }}
                onClick={() => props.setCurrentBot(props.name)}
            >   
                <Avatar 
                    mx={{base:'auto', md: '2'}} 
                    size='sm' 
                    name={props.name}  
                    description={`${props.name} profile picture`}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
                <Text textColor='black' display={{base: 'none', md: 'flex'}}>
                    {props.name}
                </Text>
            </Flex>
        </Tooltip>
    );
};

export default NavItem;