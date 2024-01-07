import Link from "next/link";

const Footer = () => {
        return (
            <div>
                <Link href="/privacy">Privacy</Link> | <Link href="/imprint">Imprint</Link>
            </div>
        );
}

export default Footer;
