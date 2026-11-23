import { getJobs } from '@/lib/api/jobs';
import { NewJobData } from '@/types';
import React from 'react';

const BrowseJobPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  console.log(query)

  const jobs = await getJobs()

  return <div>
    BrowseJobPage
    {
      jobs.map((job: NewJobData) => {
        {job.title}
      })
    }
    </div>
}

export default BrowseJobPage;