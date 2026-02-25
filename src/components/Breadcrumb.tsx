import Link from 'next/link';
import React from 'react';

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  crumbs: Crumb[];
};
export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav className="mb-lg md:mb-xl" aria-label='パンくずリスト'>
      <ol className="flex flex-wrap m-0 p-0 list-none text-xs md:text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center after:content-['/'] after:mx-1 last:after:content-['']">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="text-primary no-underline hover:underline">
                  {crumb.label}
                </Link>
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