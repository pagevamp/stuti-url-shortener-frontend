import { UrlsComponent } from '@/src/features/urls/UrlsComponent';
import { filterDates, sortFields, urlOrder } from '@/src/hooks/useUrls';

const Urls = async (props: {
  searchParams?: Promise<{
    query?: string;
    sortOrder?: urlOrder;
    sortColumn?: sortFields;
    filter?: filterDates;
    filterField?: sortFields;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const filter = searchParams?.filter || filterDates.start_date;
  const filterField = searchParams?.filterField || sortFields.created_at;
  const sortOrder = searchParams?.sortOrder || urlOrder.ASC;
  const sortColumn = searchParams?.sortColumn || sortFields.created_at;

  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <UrlsComponent
        query={query}
        filter={filter}
        filterField={filterField}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        currentPage={currentPage}
      />
    </>
  );
};

export default Urls;
