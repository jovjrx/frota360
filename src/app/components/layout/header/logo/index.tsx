import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href='/' className='inline-flex items-center'>
      <Image
        src='/logo-horizontal-branca.png'
        alt='Frota360'
        width={170}
        height={60}
        className='h-12 w-auto'
        quality={100}
        priority
      />
    </Link>
  )
}

export default Logo
