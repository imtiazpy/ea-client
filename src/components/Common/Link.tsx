import Link from 'next/link';
import { ReactNode } from 'react';

export interface ICustomLink {
  to: string;
  scroll: boolean;
  children: ReactNode;
  className?: string;
  onClick?: (e: any) => void;
}

const CustomLink: React.FC<ICustomLink> = ({
  to,
  scroll,
  children,
  className,
  ...rest
}) => {
  return (
    <Link href={to} scroll={scroll || true}>
      <a {...rest} className={className}>
        {children}
      </a>
    </Link>
  );
};

export default CustomLink;
