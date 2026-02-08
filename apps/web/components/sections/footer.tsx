import Logo from "../ui/Logo"
import NavRoute from "../ui/NavBar/NavRoute"


const Footer = () => {
    return (
        <div className="dark:bg-dark py-14 px-12 flex justify-between items-center">
            <Logo />
            <div className="flex text-slate-600 gap-8">
                <NavRoute underLineOnHover route="Privacy Policy" />
                <NavRoute underLineOnHover route="Terms of Service" />
                <NavRoute underLineOnHover route="Support" />
            </div>
            <p className="text-slate-400">@ 2026 EduStream Inc. All rights reserved.</p>
        </div>
    )
}

export default Footer