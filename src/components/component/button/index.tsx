import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface InterfaceButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'base' | 'logo' | 'sort' | 'icon' | 'nav';
  children: ReactNode;
  size?: 's' | 'm' | 'l' | 'full';
}

export default function Button(props: InterfaceButton) {
  const { children, buttonType = 'base', size = 'full', type = 'button', className, ...rest } = props;

  const buttonStyle = {
    base: '.base ',
    icon: '.icon ',
    nav: '.nav ',
    logo: '.logo ',
    sort: '.sort ',
  };

  const baseSize = () => {
    if (buttonStyle[buttonType] === 'base') {
      if (size === 's') return '.small ';
      if (size === 'm') return '.medium ';
      if (size === 'l') return '.large ';
      if (size === 'full') return '.full ';
    }
    return '';
  };

  return (
    <button className={buttonStyle[buttonType] + baseSize() + className} type={type} {...rest}>
      {children}
    </button>
  );
}
