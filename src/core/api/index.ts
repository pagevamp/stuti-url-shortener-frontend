import { api } from '@lib/axios';
import { UrlFormTypes } from '../types/url-types';

export const getAllUrls = () => {
  return api.get(`/urls`);
};

export const postUrls = (body: UrlFormTypes) => {
  return api.post(`/urls`, body);
};

export const editUrl = (id: string, body: UrlFormTypes) => {
  return api.patch(`/urls:${id}`, body);
};

export const deleteUrls = (id: string) => {
  return api.post(`/urls:${id}`);
};
