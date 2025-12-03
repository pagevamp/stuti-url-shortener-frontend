import { UrlsComponent } from '@/src/features/urls/UrlsComponent';

export enum urlOrder {
  ASC,
  DESC,
}
const Urls = async (props: {
  searchParams?: Promise<{
    query?: string;
    sort?: urlOrder;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || urlOrder.ASC;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <UrlsComponent query={query} sort={sort} currentPage={currentPage} />
    </>
  );
};

export default Urls;
