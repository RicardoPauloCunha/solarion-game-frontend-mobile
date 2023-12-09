import { DrawerActions, useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import NavLogo from "../../Logos/NavLogo"
import { Container, Icon } from "./styles"

const Navbar = () => {
    const navigation = useNavigation()

    const handleToggleSidebar = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (
        <Container>
            <NavLogo />

            <TouchableOpacity
                onPress={handleToggleSidebar}
            >
                <Icon name='bars' />
            </TouchableOpacity>
        </Container>
    )
}

export default Navbar