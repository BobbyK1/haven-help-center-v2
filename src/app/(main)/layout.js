import NavbarNoAuth from "../UI/navbar-no-auth";


export default function Layout({ children }) {

    return (
        <>
            <NavbarNoAuth />
            {children}
        </>
    )
}