import { FilterDates, SortFields, UrlOrder } from '@/features/urls/constants';
import { UrlsComponent } from '@features/urls/UrlsComponent';

const Urls = async (props: {
  searchParams?: Promise<{
    query?: string;
    sortOrder?: UrlOrder;
    sortColumn?: SortFields;
    start_date?: FilterDates.START_DATE;
    end_date?: FilterDates.END_DATE;
    filterDate?: Date | null;
    filterField?: SortFields;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const filterDate =
    searchParams?.filterDate || new Date('2025-01-01T12:30:00');
  const filterField = searchParams?.filterField || SortFields.CREATED_AT;
  const start_date = searchParams?.start_date || FilterDates.START_DATE;
  const end_date = searchParams?.end_date || FilterDates.END_DATE;
  const sortColumn = searchParams?.sortColumn || SortFields.CREATED_AT;
  const sortOrder = searchParams?.sortOrder || UrlOrder.ASC;

  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <UrlsComponent
        query={query}
        filterDate={filterDate}
        filterField={filterField}
        sortColumn={sortColumn}
        start_date={start_date}
        end_date={end_date}
        sortOrder={sortOrder}
        currentPage={currentPage}
      />
    </>
  );
};

export default Urls;
