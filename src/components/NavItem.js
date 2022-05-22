import {
    Flex,
    Avatar,
    AvatarBadge,
    Text,
} from '@chakra-ui/react';

const NavItem = (props) => {

    return (
        <Flex
            mx='2'
            px='2'
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
            <Avatar size='sm' name={props.name} src=''>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <Text textColor='black'>
                {props.name}
            </Text>
        </Flex>
    );
};

export default NavItem;