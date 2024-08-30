import ProductView from "@/views/Product";
import { ProductType } from "@/types/product.type";

/**
 * ProductPage component that renders a list of products.
 *
 * @param {Object} props - Component props
 * @param {ProductType[]} props.products - Array of products to display
 * @returns {JSX.Element} - JSX element representing the product page
 */
const ProductPage = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ProductPage;

/**
 * getServerSideProps function that fetches product data from API on each request.
 *
 * @returns {Promise<{ props: { products: ProductType[] } }>} - Promise resolving to an object with props for the ProductPage component
 */
export async function getServerSideProps() {
  // Fetch product data from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
  };
}
