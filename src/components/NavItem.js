import {
    Flex,
    Avatar,
    AvatarBadge,
    Text,
} from '@chakra-ui/react';

const NavItem = (props) => {

    return (
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
            <Avatar mx='2' size='sm' name={props.name} src=''>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <Text textColor='black' display={{'base': 'none', 'md': 'flex'}}>
                {props.name}
            </Text>
        </Flex>
    );
};

export default NavItem;