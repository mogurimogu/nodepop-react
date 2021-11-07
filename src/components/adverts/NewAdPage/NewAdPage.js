import { useState } from "react";
import Layout from "../../layout/Layout";
import { AlertBox, Loading } from "../../common/";
import { createAdverts } from "../service";
import { Redirect } from "react-router";

function NewAdPage({ history, ...props }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    sale: true,
    tags: [],
    photo: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdAdvertId, setCreatedAdvertId] = useState("");

  const resetError = () => setError(null);

  const handleInput = (event) => {
    const valid = event.target.validity.valid;
    !valid ? (event.target.className = "error") : (event.target.className = "");
    const changedInput = event.target.name;
    const inputValue = event.target.value;
    let formmatedInputValue = "";
    //parse true or false into boolean
    if (inputValue === "true") {
      formmatedInputValue = true;
    } else if (inputValue === "false") {
      formmatedInputValue = false;
    } else {
      formmatedInputValue = inputValue;
    }
    setProduct({ ...product, [changedInput]: formmatedInputValue });
  };

  const handleMultiSelect = (event) => {
    const valid = event.target.validity.valid;
    !valid ? (event.target.className = "error") : (event.target.className = "");
    let multiselect = [...product.tags];
    const changedInput = event.target.name;
    const inputValue = event.target.value;
    if (multiselect.indexOf(inputValue) < 0) {
      multiselect.push(inputValue);
    } else {
      multiselect = multiselect.filter((e) => e !== inputValue);
    }
    setProduct({ ...product, [changedInput]: multiselect });
  };

  const handlePhoto = (event) => {
    setProduct({ ...product, photo: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    resetError();
    setIsLoading(true);
    try {
      const createdAdvert = await createAdverts(product);
      setCreatedAdvertId(createdAdvert.id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      if (error.status === 401) {
        return history.push("/login");
      }
      setIsLoading(false);
    }
  };

  if (createdAdvertId) {
    return <Redirect to={`/adverts/${createdAdvertId}`} />;
  }

  return (
    <Layout {...props} idPage="new-ad">
      {isLoading ? (
        <Loading extraClass="nodepop" />
      ) : (
        <form noValidate onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Nombre del producto"
            onChange={handleInput}
            value={product.name}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Precio"
            onChange={handleInput}
            min="0"
            value={product.price}
            required
          />
          <select name="sale" onChange={handleInput}>
            <option value="true">Venta</option>
            <option value="false">Compra</option>
          </select>

          <select
            name="tags"
            onChange={handleMultiSelect}
            multiple={true}
            value={product.tags}
            required
          >
            <option value="lifestyle">Lifestyle</option>
            <option value="mobile">Mobile</option>
            <option value="motor">Motor</option>
            <option value="work">Work</option>
          </select>

          <input
            name="photo"
            type="file"
            onChange={handlePhoto}
            accept=".jpg, .png, .webp, .gif, .bmp"
          />
          <button
            type="submit"
            disabled={
              isLoading ||
              !product.name ||
              !product.price ||
              !product.tags.length
            }
          >
            ➕ Crear producto
          </button>
        </form>
      )}
      {error && <AlertBox onClick={resetError}>{error.message}</AlertBox>}
    </Layout>
  );
}

export default NewAdPage;
