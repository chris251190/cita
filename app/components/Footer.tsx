import Link from "next/link";

const Footer = () => {
        return (
            <div className="mt-8">
                 <Link href="/">Home</Link> | <Link href="/privacy">Privacy</Link> | <Link href="/imprint">Imprint</Link>
            </div>
        );
}

export default Footer;
