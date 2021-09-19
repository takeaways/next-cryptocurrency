import Link from "next/link";
import styles from "styles/404.module.css";
function PageNotFound() {
  return (
    <article className={styles.container}>
      <header>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>잘 못된 요청입니다.</p>
        <Link href="/">
          <a>홈으로..</a>
        </Link>
      </header>
    </article>
  );
}

export default PageNotFound;
