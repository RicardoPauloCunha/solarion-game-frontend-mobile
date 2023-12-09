import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useAuthContext } from '../../../hooks/contexts/auth'
import { removeTokenStorage } from '../../../hooks/storage/token'
import Theme from '../../../styles/theme'
import TextButton from '../../Buttons/TextButton'
import MenuLogo from '../../Logos/MenuLogo'
import { Container } from './styles'

interface SidebarProps extends DrawerContentComponentProps {

}

const Sidebar = ({ ...props }: SidebarProps) => {

    const {
        loggedUser,
        setLoggedUser
    } = useAuthContext()

    const handleLogout = async () => {
        await removeTokenStorage()
        setLoggedUser(undefined)

        props.navigation.closeDrawer()
    }

    return (
        <Container>
            <DrawerContentScrollView
                contentContainerStyle={{
                    backgroundColor: Theme.color.lightOrange
                }}
                {...props}
            >
                <MenuLogo />

                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {loggedUser && <TextButton
                text='Sair'
                onClick={handleLogout}
            />}
        </Container>
    )
}

export default Sidebar