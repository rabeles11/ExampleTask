import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const BodyWrapper = styled.div`
  background-color: smoke-white;
  margin: 0 auto;
  padding: 0vw 7vw;
`;

const CardWrapper = styled.div`
  background-color: smoke-white;
  margin: 0 auto;
  display: grid;
  padding-top: 5vh;
  grid-template-columns: repeat(4, 1fr);
  gap: 3vw;
`;

async function fetchEstates(page: number) {
  const response = await api.getTokensPagination(40, page);
  return response;
}

function BodyContainer() {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data, isFetching, isPreviousData } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchEstates(page),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const cardArray = new Array(data?.data.estates.length).fill(null);

  useEffect(() => {
    if (!isPreviousData && data?.data.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["projects", page + 1],
        queryFn: () => fetchEstates(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);
  return (
    <BodyWrapper>
      {isFetching ? (
        <span> Loading...</span>
      ) : (
        <CardWrapper>
          {cardArray.map((_, index) => (
            <Card
              headline={data?.data.estates[index].title}
              images={JSON.parse(data?.data.estates[index]?.imageURLs || "[]")}
              key={index}
            />
          ))}
        </CardWrapper>
      )}{" "}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => (data?.data.hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !data?.data.hasMore}
      >
        Next Page
      </button>
    </BodyWrapper>
  );
}

export default BodyContainer;
