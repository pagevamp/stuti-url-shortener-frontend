import { UrlsComponent } from '@/src/features/urls/UrlsComponent';
import { sortFields, urlOrder } from '@/src/hooks/useUrls';

const Urls = async (props: {
  searchParams?: Promise<{
    query?: string;
    sortOrder?: urlOrder;
    sortColumn?: sortFields;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const sortOrder = searchParams?.sortOrder || urlOrder.ASC;
  const sortColumn = searchParams?.sortColumn || sortFields.created_at;

  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <UrlsComponent
        query={query}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        currentPage={currentPage}
      />
    </>
  );
};

export default Urls;
