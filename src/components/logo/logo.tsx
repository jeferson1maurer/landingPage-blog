import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" title="Página inicial">
        <Image 
          src="/Brand-Icon.svg"
          alt="Logo site"
          width={32}
          height={32}
          className="block md:hidden"
          priority
        />
        <Image 
            src="/Brand-Logo.svg" 
            alt="Logo site" 
            width={116} 
            height={32}
            className="hidden md:block"
            priority
        />
    </Link>
  );
}
