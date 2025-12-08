import { filterDates, sortFields, urlOrder } from '@/features/urls/constants';
import { UrlsComponent } from '@features/urls/UrlsComponent';

const Urls = async (props: {
  searchParams?: Promise<{
    query?: string;
    sortOrder?: urlOrder;
    sortColumn?: sortFields;
    filterType?: filterDates;
    filterDate?: Date | null;
    filterField?: sortFields;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const filterType = searchParams?.filterType || filterDates.START_DATE;
  const filterDate =
    searchParams?.filterDate || new Date('2025-01-01T12:30:00');
  const filterField = searchParams?.filterField || sortFields.CREATED_AT;
  const sortOrder = searchParams?.sortOrder || urlOrder.ASC;
  const sortColumn = searchParams?.sortColumn || sortFields.CREATED_AT;

  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <UrlsComponent
        query={query}
        filterType={filterType}
        filterDate={filterDate}
        filterField={filterField}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        currentPage={currentPage}
      />
    </>
  );
};

export default Urls;
