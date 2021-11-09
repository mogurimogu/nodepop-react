import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductCard } from "../../common";
import Layout from "../../layout/Layout";
import { deleteAdvert, getAdverts } from "../service";

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
    }
    getAd();
  }, [advertId]);

  const handleDelete = () => {
    if (window.confirm('¿seguro que desea eliminar el producto?')){
      deleteAdvert(advertId).then(() => history.push('/'))
    }
  }
  
  return product ? (
    <Layout idPage="advert-page">
      <ProductCard {...product} />
      <button className="delete" onClick={handleDelete}>
        Eliminar
      </button>
    </Layout>
  ) : (
    <Layout>No ha cargado el producto <br/>
    Compruebe que su navegador no esté bloqueando los recursos</Layout>
  );
}

export default AdvertPage;
