import Image from 'next/image';

const Logo = () => {
  return (
    <div className="w-full flex justify-center">
      <Image src="/Cita.png" alt="Logo" width={200} height={200} priority />
    </div>
  );
};

export default Logo;