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
        if (error.status === 404){
          history.replace('/404')
        }else if(error.status === 401){
          history.replace('/login')
        }
        console.error(error.message);
      }
    }
    getAd();
  }, [advertId, history]);

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
    <Layout>No se ha podido cargar el producto <br/>
    Compruebe que su navegador no esté bloqueando los recursos</Layout>
  );
}

export default AdvertPage;
