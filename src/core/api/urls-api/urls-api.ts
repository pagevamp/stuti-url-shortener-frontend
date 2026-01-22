import { UrlFormTypes } from '@/core/types/url-types';
import { api } from '@lib/axios';

export const getAllUrls = () => {
  return api.get(`/urls`);
};

export const postUrl = (body: UrlFormTypes) => {
  return api.post(`/urls`, body);
};

export const editUrl = (id: string, body: UrlFormTypes) => {
  return api.patch(`/urls/${id}`, body);
};

export const deleteUrl = (id: string) => {
  return api.delete(`/urls/${id}`);
};

export const redirectUrl = (shortCode: string) => {
  window.open(`/urls/${shortCode}`, '_blank');
};

