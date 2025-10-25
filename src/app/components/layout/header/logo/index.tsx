import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/logo-horizontal-branca.png"
        alt="Frota360"
        width={180}
        height={48}
        style={{ width: "auto", height: "auto" }}
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;
