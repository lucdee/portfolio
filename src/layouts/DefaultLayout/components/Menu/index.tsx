import Image from 'next/image';
import Router from 'next/router';
import { useRef, useState } from 'react';

import { Button } from 'components/Form/Button';
import { BreadcrumbProps, Breadcrumb } from 'components/Breadcrumb';
import ContactForm, { ContactFormHandles } from 'components/ContactForm';

import styles from './styles.module.scss';

type ActiveMenu = 'blog' | 'produtos';

type MenuProps = {
  breadcrumb?: BreadcrumbProps;
};

export const Menu: React.FC<MenuProps> = ({ breadcrumb }) => {
  const contactFormRef = useRef<ContactFormHandles>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu | null>(null);

  const handleMenuActive = (option: ActiveMenu) => {
    setActiveMenu(state => (option === state ? null : option));
  };

  Router.events.on('routeChangeComplete', () =>
    setTimeout(() => {
      setActiveMenu(null);
    }, 200),
  );

  return (
    <>
      <ContactForm ref={contactFormRef} />
      <header className={styles['menu-container']}>
        <div className="centralized-container">
          <div className={styles['menu-content']}>
            <div className={styles.logo}>
              <h2>Lt</h2>
              {breadcrumb && <Breadcrumb items={breadcrumb.items} />}
            </div>

            <nav
              className={`${styles['navbar-container']} ${
                isMenuOpen ? styles['is-menu-open'] : ''
              }`}
            >
              <ul className={styles['nav-list-container']}></ul>

              <Button
                type="button"
                title="Entre em contato"
                background="primary"
                onClick={() => contactFormRef.current?.openContactForm()}
              >
                Contato
              </Button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
