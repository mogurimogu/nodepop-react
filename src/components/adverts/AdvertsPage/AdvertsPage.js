import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllAdverts } from "../service";
import Layout from "../../layout/Layout";
import { ProductCard } from "../../common";

const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>Se el primero en publicar un anuncio</p>
    <button as={Link} to="/new-ad">
      Crear anuncio
    </button>
  </div>
);

function AdvertsPage({ history, ...props }) {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAllAdverts().then((adverts) => setAdverts(adverts));
  }, []);

  return (
    <Layout {...props} idPage="adverts-page">
      {adverts.length ? (
        <ul className="product-list">
          {adverts.map(({...product }) => (
            <li key={product.id}>
              <ProductCard {...product}/>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </Layout>
  );
}

export default AdvertsPage;
