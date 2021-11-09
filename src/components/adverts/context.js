import React, { useContext } from 'react';

const AdsFilterContext = React.createContext();

export const AdsFilterContextProvider = AdsFilterContext.Provider;
export const AdFilterContextConsumer = AdsFilterContext.Consumer;

export const useAdContext = () => {
  const ads = useContext(AdsFilterContext);
  return ads;
};

export default AdsFilterContext;
