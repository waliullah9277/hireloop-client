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

  return <div>
    BrowseJobPage
    </div>
}

export default BrowseJobPage;