import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllAdverts } from "../service";
import Layout from "../../layout/Layout";
import { ProductCard } from "../../common";
import AdvertFilter from "./AdvertFilter";

const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>Sea el primero en publicar un anuncio</p>
    <Link to="/new-ad">
      <button>
        Crear anuncio
      </button>
    </Link>
  </div>
);

function AdvertsPage({ history, ...props }) {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAllAdverts().then((adverts) => setAdverts(adverts));
  }, []);

  return (
    <Layout {...props} idPage="adverts-page">
      <AdvertFilter filterAds={ads => setAdverts(ads)} selectedAds={adverts}/>
      {adverts.length ? (
        <ul className="product-list">
          {adverts.map(({ ...product }) => (
            <li key={product.id}>
              <ProductCard {...product} />
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
