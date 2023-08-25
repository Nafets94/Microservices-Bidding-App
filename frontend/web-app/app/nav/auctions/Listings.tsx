import React from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import AppPagination from '@/app/components/AppPagination';

async function getData(): Promise<PagedResult<Auction>> {
  const res = await fetch('http://localhost:6001/search?pageSize=3');
  if (!res.ok) throw new Error('Failed to fetched data');
  return res.json();
}

export default async function Listings() {
  const data = await getData();
  return (
    <>
      <div className='grid grid-cols-4 gap-6'>
        {data && data.result.map(auction => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination currentPage={1} pageCount={data.pageCount} />
      </div>
    </>
  )
}
