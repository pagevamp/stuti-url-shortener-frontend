import { UrlsComponent } from '@/src/features/urls/UrlsComponent';
import { filterDates, sortFields, urlOrder } from '@/src/hooks/useUrls';

const Urls = async (props: {
  searchParams?: Promise<{
    query?: string;
    sortOrder?: urlOrder;
    sortColumn?: sortFields;
    filterFrom?: filterDates.start_date;
    filterTo?: filterDates.end_date;
    filterField?: sortFields;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const filterFrom = searchParams?.filterFrom || filterDates.start_date;
  const filterTo = searchParams?.filterTo || filterDates.end_date;
  const filterField = searchParams?.filterField || sortFields.created_at;
  const sortOrder = searchParams?.sortOrder || urlOrder.ASC;
  const sortColumn = searchParams?.sortColumn || sortFields.created_at;

  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <UrlsComponent
        query={query}
        filterFrom={filterFrom}
        filterTo={filterTo}
        filterField={filterField}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        currentPage={currentPage}
      />
    </>
  );
};

export default Urls;
