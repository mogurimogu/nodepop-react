import { useState } from "react";
import { getFilteredAds } from "../service";

function AdvertFilter(props) {
  const [product, setProduct] = useState(props.selectedAds);
  const [filter, setFilter] = useState({
    name: "",
    priceMin: "",
    priceMax: "",
    sale: "",
    tags: [],
    photo: "",
  });

  const handleInput = (event) => {
    const filterName = event.target.name;
    const filterValue = event.target.value;
    setFilter({ ...filter, [filterName]: filterValue });
  };

  const handleMultiSelect = (event) => {
    const filterName = event.target.name;
    const filterValue = event.target.value;
    let multiselect = [...filter[filterName]];
    if (multiselect.indexOf(filterValue) < 0) {
      multiselect.push(filterValue);
    } else {
      multiselect = multiselect.filter((e) => e !== filterValue);
    }
    setFilter({ ...filter, [filterName]: multiselect });
  };

  const handleFilter = async (event) => {
    event.preventDefault();
    let adverts = props.selectedAds;
    try {
      const ads = await getFilteredAds(filter);
      adverts = ads
      console.log(adverts)
      props.filterAds(adverts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form noValidate onSubmit={handleFilter}>
      <input
        name="name"
        type="text"
        placeholder="Nombre del producto"
        onChange={handleInput}
        value={filter.name}
        required
      />
      <input
        name="priceMin"
        type="number"
        placeholder="Precio mínimo"
        onChange={handleInput}
        min="0"
        value={filter.priceMin}
        required
      />
      <input
        name="priceMax"
        type="number"
        placeholder="Precio Máximo"
        onChange={handleInput}
        min="0"
        value={filter.priceMax}
        required
      />
      <select name="sale" onChange={handleInput}>
        <option value="">Compra/Venta</option>
        <option value="true">Venta</option>
        <option value="false">Compra</option>
      </select>

      <select
        name="tags"
        onChange={handleMultiSelect}
        multiple={true}
        value={filter.tags}
        required
      >
        <option value="lifestyle">Lifestyle</option>
        <option value="mobile">Mobile</option>
        <option value="motor">Motor</option>
        <option value="work">Work</option>
      </select>

      <button type="submit">🔎 Filtrar</button>
    </form>
  );
}

export default AdvertFilter;
