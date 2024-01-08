import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="w-full flex justify-center">
      <Link href="/">
          <Image src="/Cita.png" alt="Logo" width={200} height={200} priority />
      </Link>
    </div>
  );
};

export default Logo;