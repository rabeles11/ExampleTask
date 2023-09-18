import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const BodyWrapper = styled.div`
  background-color: smoke-white;
  margin: 0 auto;
  min-height: 80vh;
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

const StyledSpan = styled.div`
  font-size: 55px;
  padding-top: 40vh;
  color: black;
`;

const LoadingSpan = styled(StyledSpan)``;
const ErrorSpan = styled(StyledSpan)``;

const PageTextContainer = styled.div`
  font-size: 25px;
  color: black;
`;

async function fetchEstates(page: number) {
  const response = await api.getTokensPagination(40, page);
  return response;
}

function BodyContainer() {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ["estates", page],
    queryFn: () => fetchEstates(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const cardArray = new Array(data?.data.estates.length).fill(null);

  useEffect(() => {
    console.log(isPreviousData);
    console.log(error);
    if (isPreviousData && data?.data.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["estates", page + 1],
        queryFn: () => fetchEstates(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);
  return (
    <BodyWrapper>
      {isFetching ? (
        <LoadingSpan> Loading...</LoadingSpan>
      ) : status === "error" ? (
        <ErrorSpan>Sorry we were unable to get data</ErrorSpan>
      ) : (
        <>
          <CardWrapper>
            {cardArray.map((_, index) => (
              <Card
                headline={data?.data.estates[index].title}
                images={JSON.parse(
                  data?.data.estates[index]?.imageURLs || "[]"
                )}
                key={index}
              />
            ))}
          </CardWrapper>
          <PageTextContainer>Current Page: {page + 1}</PageTextContainer>
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
        </>
      )}{" "}
    </BodyWrapper>
  );
}

export default BodyContainer;
