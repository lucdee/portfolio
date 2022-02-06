import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import axios from 'axios';
import { FiX } from 'react-icons/fi';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';

import { contactFormSchema } from './utils/contactFormSchema';

import Image from 'next/image';
import Link from 'next/link';

import { Loading } from './Loading';
import { Input } from '../Form/Input';
import { Button } from '../Form/Button';
import { Textarea } from '../Form/Textarea';

import styles from './styles.module.scss';

export type ContactFormHandles = {
  openContactForm: () => void;
};

const ContactForm: ForwardRefRenderFunction<ContactFormHandles> = (_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openContactForm = useCallback(() => {
    setIsVisible(true);
  }, []);

  const closeContactForm = useCallback(() => {
    setIsVisible(false);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        openContactForm,
      };
    },
    [openContactForm],
  );

  return (
    <div
      className={`${styles.contactFormContainer} ${
        isVisible ? styles.isVisible : ''
      }`}
    >
      <button
        aria-label="Clique para fechar o formulário"
        className={styles.closeButton}
        title="Fechar formulário de contato"
        type="button"
        onClick={closeContactForm}
      >
        <FiX size={24} />
      </button>

      <h3 className="heading3 white ">Entre em contato</h3>

      <div className={styles['contact-section']}>
        <Link href="https://www.linkedin.com/in/lucasthomazella/">
          <a target="_blank">
            <img src="https://i.imgur.com/OrrIarK.png" width={80} height={80} />
          </a>
        </Link>
        <Link href="https://www.facebook.com/lucas.thomazella/">
          <a target="_blank">
            <img src="https://i.imgur.com/EKDv07w.png" width={80} height={80} />
          </a>
        </Link>
      </div>

      <div className={styles['contact-section']}>
        <Link href="https://wa.me/5511965988585">
          <a target="_blank">
            <img src="https://i.imgur.com/axUDnew.png" width={80} height={80} />
          </a>
        </Link>
        <Link href="https://www.instagram.com/lucasthomz/">
          <a target="_blank">
            <img src="https://i.imgur.com/iqcabYt.png" width={80} height={80} />
          </a>
        </Link>
      </div>

      <article>
        <img src="/views/home/imgs/nave-espacial.png" />
      </article>
    </div>
  );
};

export default forwardRef(ContactForm);
