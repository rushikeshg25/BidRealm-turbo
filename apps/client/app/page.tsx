import { getAuctions } from '@/actions/GetAuctions';
import Filters from '@/components/Filters';
import Auctions from '@/components/pages/Auctions';
import PaginationWrapper from '@/components/PaginationWrapper';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    min?: string;
    max?: string;
    s?: string[];
    categories?: string[];
  };
}) {
  const search = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 6;
  const offset = (currentPage - 1) * limit;
  const min = searchParams?.min || '';
  const max = searchParams?.max || '';
  const status = searchParams?.s || [];
  const categories = searchParams?.categories || [];
  const { auctions, totalPages } = await getAuctions({
    offset,
    limit,
    search,
  });
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 p-5 dark:bg-background'>
      <Filters />
      <div className='flex flex-col gap-5'>
        <Auctions auctions={auctions} />
        <PaginationWrapper totalPages={totalPages} />
      </div>
    </div>
  );
}
