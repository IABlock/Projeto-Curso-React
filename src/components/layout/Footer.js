import {FaFacebook, FaLinkedin, FaInstagram} from 'react-icons/fa';

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      
      <ul className={styles.social_list}>
        <li className={styles.social_list}>

            <FaFacebook />

        </li>
        <li className={styles.social}>

            <FaLinkedin />

        </li>
        <li className={styles.social}>

            <FaInstagram />

        </li>
      </ul>
      <p className={styles.copy_right}>
          <span>© 2023 Meu Projeto.</span> Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
