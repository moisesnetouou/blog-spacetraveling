import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <h1>spacetraveling</h1>
    </div>
  );
}
