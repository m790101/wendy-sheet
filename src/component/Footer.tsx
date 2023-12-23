import { ReactNode } from "react";

const Footer = ({children}:{children:ReactNode}) => {
    return (
        <div className="footer d-flex justify-content-center align-items-center gap-5">
            {children}
        </div>
    )
}

export default Footer;