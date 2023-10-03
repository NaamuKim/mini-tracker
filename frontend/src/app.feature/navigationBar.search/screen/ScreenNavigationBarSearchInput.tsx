import React, { useState } from "react";
import styled from "styled-components";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { API_SEARCH_APP } from "@/app.module/constant/api/app.dashboard/searchAPP";
import useDebounce from "@/app.module/hooks/useDebounce";
import { TSearchApps } from "@/app.feature/navigationBar.search/module/type/APIResponseType";
import Link from "next/link";

const ScreenNavigationBarSearchInput = () => {
  const [word, setWord] = useState("");
  const [fetchingWord, setFetchingWord] = useState("");
  const debounce = useDebounce();
  const { data: possibleResults } = useQueryFn<
    TSearchApps,
    TSearchApps["apps"]
  >([API_SEARCH_APP, { word: fetchingWord }], {
    select: ({ apps }) => apps,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    debounce(() => setFetchingWord(e.target.value));
  };

  return (
    <StyledWrapper>
      <input
        onChange={handleChange}
        value={word}
        type="text"
        placeholder="Search Your Page BaseURL"
      />
      {possibleResults && word && (
        <ul>
          {possibleResults.map(({ baseUrl }, index) => (
            <li key={baseUrl + String(index)}>
              <Link
                href={{
                  query: {
                    queriedUrl: baseUrl,
                  },
                }}
              >
                <span>{baseUrl}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </StyledWrapper>
  );
};

export default ScreenNavigationBarSearchInput;

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  > input {
    height: 30px;
    width: 300px;
    padding: 25px 20px;
    border: none;
    border-radius: 30px;
    background-color: var(--upper-background-color);
    color: var(--text-color);
    font-size: 16px;
    &:focus,
    &:active {
      outline: none;
    }
  }
  > ul {
    list-style: none;
    position: absolute;
    padding-left: 20px;
    top: 30px;
    width: 300px;
    display: flex;
    flex-direction: column;
    max-height: 120px;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    color: var(--upper-background-color);
    > li {
      padding: 5px 0;
      &:hover {
        > a {
          color: var(--text-secondary-color);
        }
      }
    }
    a {
      color: var(--upper-background-color);
    }
  }
`;
