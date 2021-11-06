import Layout from "../../layout/Layout";

function NewAdPage({ history, ...props }) {
  return (
    <Layout {...props} idPage="new-ad">
      <form noValidate>
        <input
          name="name"
          type="text"
          placeholder="Nombre del producto"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          min="0"
          required
        />
        <select name="sale">
          <option value="true">Venta</option>
          <option value="false">Compra</option>
        </select>
        <select name="tags" required>
          <option value="">Seleccione algún Tag</option>
          <option value="true">Venta</option>
          <option value="false">Compra</option>
        </select>
        <input name="photo" type="file" />
        <button type="submit"> ➕ Crear producto</button>
      </form>
    </Layout>
  );
}

export default NewAdPage;
