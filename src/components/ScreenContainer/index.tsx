import Navbar from "../Menu/Navbar"
import { Container, Content, Footer } from "./styles"

interface ScreenContainerProps {
    children: React.ReactNode
}

const ScreenContainer = ({
    children
}: ScreenContainerProps) => {
    return (
        <Container>
            <Content>
                <Navbar />

                {children}

                <Footer />
            </Content>
        </Container>
    )
}

export default ScreenContainer