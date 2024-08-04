import styles from "./DetailProduct.module.scss"
const DetailProduct = () => {
  return (
    <div

      className={styles.productDetail}
    >
      <div className={styles.productDetail__image}>
        <img src={product.image} alt={product.name} />
      </div>
      <h4 className={styles.product__content__item__name}>{product.name}</h4>
      <p className={styles.product__content__item__category}>
        {product.category}
      </p>
      <p className={styles.product__content__item__price}>
        {product.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </p>
    </dic>
  );
};

export default DetailProduct;
