import { getAllUrls, postUrls } from '@/core/api';
import { UrlFormTypes, UrlTableTypes } from '@/core/types/url-types';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useUrlIntegration() {
  const [urlData, setUrlData] = useState<UrlTableTypes[]>([]);

  function useGetUrls() {
    const urls = useEffect(() => {
      getAllUrls().then((json) => setUrlData(json.data));
    });
    return urls;
  }

  function usePostUrls(body: UrlFormTypes) {
    try {
      postUrls(body);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`There was an error posting URL : ${err.message}`);
      }
      toast.error('Could not post due to an unknown error');
    }
  }
  return {
    urlData,
    useGetUrls,
    usePostUrls,
  };
}
