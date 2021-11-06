import client from '../../api/client';

const BaseUrl = '/api/v1';

export const getAllAdverts = () => {
  const url = `${BaseUrl}/adverts`;
  return client.get(url);
};

export const createAdverts = advert => {
  const url = `${BaseUrl}/tweets`;
  return client.post(url, advert);
};

export const getAdverts = advertId => {
  const url = `${BaseUrl}/adverts/${advertId}`;
  return client.get(url);
};