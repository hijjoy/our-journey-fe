import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './style.module.scss';

interface InterfaceButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'base-small' | 'base-medium' | 'base-large' | 'base-full' | 'logo' | 'sort' | 'icon' | 'nav';
  children: ReactNode;
}

export default function Button(props: InterfaceButton) {
  const { children, buttonType = 'base-full', type = 'button', ...rest } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={styles[buttonType]} type={type} {...rest}>
      {children}
    </button>
  );
}
