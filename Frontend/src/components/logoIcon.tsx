import styles from './header.module.css'
import Logo from "../assets/vectors/logo";

const LogoIcon = () => {
  return (
    <div className={styles.logoContainer}>
      <Logo />
    </div>
  );
};

export default LogoIcon;
