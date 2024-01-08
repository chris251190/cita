import Link from "next/link";

const Footer = () => {
    return (
        <div className="mt-8 text-center">
<Link className="hover:text-orange-700" href="/">Home</Link> | <Link className="hover:text-orange-700" href="/about">By <b>Christian Lehr</b></Link> | <Link className="hover:text-orange-700" href="/faq">FAQ</Link> | <Link className="hover:text-orange-700" href="/privacy">Privacy</Link> | <Link className="hover:text-orange-700" href="/imprint">Imprint</Link>        </div>
    );
}

export default Footer;
