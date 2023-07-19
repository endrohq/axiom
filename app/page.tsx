import styles from './page.module.css';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>Welcome Axiom 👋</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
