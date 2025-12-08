import {
  deleteUrl,
  editUrl,
  getAllUrls,
  postUrl,
} from '@/core/api/urls-api/urls-api';
import { UrlFormTypes, UrlTableTypes } from '@/core/types/url-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useUrlIntegration() {
  const [urlData, setUrlData] = useState<UrlTableTypes[]>([]);
  function useGetUrls() {
    useEffect(() => {
      try {
        const getUrls = async () => {
          getAllUrls().then((urlJson) => setUrlData(urlJson.data));
        };
        getUrls();
        const urlInterval = setInterval(getUrls, 3000);

        return () => clearInterval(urlInterval);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`There was an error getting URL : ${err.message}`);
        }
        toast.error('Could not get urls due to an unknown error');
      }
    }, []);
    return urlData;
  }

  function handlePostUrls(body: UrlFormTypes) {
    try {
      postUrl(body);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`There was an error posting URL : ${err.message}`);
      }
      toast.error('Could not post due to an unknown error');
    }
  }

  function handleEditUrls(id: string, body: UrlFormTypes) {
    try {
      editUrl(id, body);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`There was an error editing URL : ${err.message}`);
      }
      toast.error('Could not edit due to an unknown error');
    }
  }

  function handleDeleteUrls(id: string) {
    try {
      deleteUrl(id);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`There was an error deleting URL : ${err.message}`);
      }
      toast.error('Could not delete due to an unknown error');
    }
  }

  return {
    useGetUrls,
    handlePostUrls,
    handleEditUrls,
    handleDeleteUrls,
  };
}
