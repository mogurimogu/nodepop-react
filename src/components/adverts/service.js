import client from "../../api/client";

const BaseUrl = "/api/v1";

export const getAllAdverts = () => {
  const url = `${BaseUrl}/adverts`;
  return client.get(url);
};

export const createAdverts = (product) => {
  const url = `${BaseUrl}/adverts`;
  const fd = new FormData();
  fd.append("name", product.name);
  fd.append("price", product.price);
  fd.append("sale", product.sale);
  fd.append("tags", [product.tags]);
  if(product.photo){
    fd.append("photo", product.photo);
  }

  return client.post(url, fd);
};

export const getAdverts = (advertId) => {
  const url = `${BaseUrl}/adverts/${advertId}`;
  return client.get(url);
};
