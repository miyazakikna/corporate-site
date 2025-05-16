import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  crumbs: Crumb[];
};
export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav className={styles.breadcrumb} aria-label='パンくずリスト'>
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className={isLast ? styles.current : ''}>
              {crumb.href && !isLast ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}