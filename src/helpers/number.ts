export const parsePrice = (price: number | string) => `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
