import client from "../../api/client";

const BaseUrl = "/api/v1";

export const getAllAdverts = () => {
  const url = `${BaseUrl}/adverts`;
  return client.get(url);
};

export const getFilteredAds = (filter) => {
  const filterList = {
    name: filter.name,
    tags: filter.tags,
    price: [filter.priceMin, filter.priceMax],
    sale: filter.sale,
  };

  const formatFilter = (filter) => {
    const filterKeys = Object.keys(filter);
    let filteredQuery = "";
    for (const key of filterKeys) {
      const value = filter[key];
      if (value) {
        if (Array.isArray(value)) {
          for (const element of value) {
            if (element) {
              filteredQuery += `&${key}=${element}`;
            }
          }
        } else {
          filteredQuery += `&${key}=${filter[key]}`;
        }
      }
    }
    return filteredQuery;
  };
  const url = `${BaseUrl}/adverts?${formatFilter(filterList)}`;
  return client.get(url);
};

export const createAdverts = (product) => {
  const url = `${BaseUrl}/adverts`;
  const fd = new FormData();
  fd.append("name", product.name);
  fd.append("price", product.price);
  fd.append("sale", product.sale);
  fd.append("tags", [product.tags]);
  if (product.photo) {
    fd.append("photo", product.photo);
  }

  return client.post(url, fd);
};

export const getAdverts = (advertId) => {
  const url = `${BaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = (advertId) => {
  const url = `${BaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};
