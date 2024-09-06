import styles from "./Header.module.scss";

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <h1>
        <span>User</span> Management
      </h1>
    </header>
  );
}

export default Header;
