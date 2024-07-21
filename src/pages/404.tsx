import Image from "next/image";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Image
        src="/not-found.png"
        alt="Not Found"
        className={styles.error__image}
        width={500}
        height={300}
      />
      <div>Halaman Tidak Ditemukan</div>
    </div>
  );
};

export default Custom404;