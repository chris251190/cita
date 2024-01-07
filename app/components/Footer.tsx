import Link from "next/link";

const Footer = () => {
    return (
        <div className="mt-8">
<Link className="hover:text-orange-700" href="/">Home</Link> | <Link className="hover:text-orange-700" href="/privacy">Privacy</Link> | <Link className="hover:text-orange-700" href="/imprint">Imprint</Link>        </div>
    );
}

export default Footer;
