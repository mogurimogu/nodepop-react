import { Link } from "react-router-dom";
import "./style/ProductCard.scss";

function ProductCard({ ...product }) {
  return (
    <article className="product" key={product.id}>
      <Link to={`/adverts/${product.id}`} className="card">
        <div className="photo">
          {product.photo ? (
            <img src={`${process.env.REACT_APP_API_BASE_URL}${product.photo}`} alt={product.productName} />
          ) : (
            <img
              src="https://via.placeholder.com/500x400.png/7fecd1/00674c/?text=Nodepop"
              alt="No hay imágen"
            />
          )}
        </div>
        <div className="info">
          <div className="offer">
            <span className="price">{product.price}€</span>
            {product.sale ? (
              <span title="En venta">🛒</span>
            ) : (
              <span title="Para compra">🪙</span>
            )}
          </div>
          <h1>{product.name}</h1>
        </div>
      </Link>
      <div className="tags">
        {product.tags.map((tag) => (
          <Link to={`?tags=${tag}`} className="tag" key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </article>
  );
}

export default ProductCard;
