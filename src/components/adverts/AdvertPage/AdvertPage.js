import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductCard } from "../../common";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";

function AdvertPage({ history, ...props }) {
  const [product, setProduct] = useState();

  const advertId = useParams(history).advertId;
  useEffect(() => {
    async function getAd() {
      try {
        const ad = await getAdverts(advertId);
        setProduct(ad);
      } catch (error) {
        console.error(error);
      }
    };
    getAd()
}, [advertId]);

  return product ? (
    <Layout>
      <ProductCard {...product} />
    </Layout>
  ) : (
    <Layout>No ha cargado el producto</Layout>
  );
}

export default AdvertPage;
