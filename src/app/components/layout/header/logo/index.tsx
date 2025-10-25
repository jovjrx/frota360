import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/logo-horizontal-branca.png"
        alt="Frota360"
        width={170}
        height={60}
        className="h-16 w-auto"
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;
