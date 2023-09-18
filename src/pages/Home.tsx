import {createContext, useCallback, useEffect, useState} from "react";
import {PeopleFilter} from "../People/PeopleFilter";
import {PeopleTable} from "../People/PeopleTable";
import {useQuery} from "@tanstack/react-query";
import {usePeopleLike} from "../context";


const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

const defaultUrl = "https://swapi.dev/api/people/?page=1"

const useFetch = (defaultUrl: string) => {
  const [filterValue, setFilterValue] = useState('');

  const [currentUrl, setCurrentUrl] = useState<string>(defaultUrl)
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const url = `${currentUrl}`;
  const formattedUrl = new URL(url);

  if(!formattedUrl.searchParams.has("search")){
    formattedUrl.searchParams.append("search", filterValue);
  }

  const queryKeyValue = [formattedUrl.host, formattedUrl.searchParams.get('search'), formattedUrl.searchParams.get('page')];
  const { data: body, isLoading, isSuccess } = useQuery({
    queryKey: queryKeyValue,
    queryFn: () => {
      const fetchData = async () => {
          const response = await fetch(formattedUrl);
          return response.json();
      }
      return fetchData();
    }
  })

  useEffect(() => {
    if(isSuccess){
      setData(body.results);
      setPreviousUrl(body.previous);
      setNextUrl(body.next)
    }
  }, [isSuccess, body])



  const handlePreviousPage = () => {
    if(previousUrl){
      setCurrentUrl(previousUrl)  
    }
  }

  const handleNextPage = () => {
    if(nextUrl){
      setCurrentUrl(nextUrl)  
    }
  }

  const onFilterHandler = useCallback((filter: string) => {
    setCurrentUrl(defaultUrl)
    setFilterValue(filter)
  }, [defaultUrl]);

  return {
    data, 
    loading: isLoading,
    onFilterHandler,
    filterValue,
    handlePreviousPage,
    handleNextPage,
  }
}
export const Home = () => {
  useTitle('Home Page with Custom Hook');

  const { person } = usePeopleLike();

  const {data, loading, handleNextPage, handlePreviousPage, onFilterHandler, filterValue} = useFetch(defaultUrl)

  if (loading) {
    return (
      <progress className="progress is-small is-primary" max="100"></progress>
    );
  }

  return (
    <section className="section">

      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">
          My first website with <strong>Bulma</strong>!
        </p>
      </div>

      <p> Vous aimez {person.length} personnages </p>
      <PeopleFilter onFilter={onFilterHandler} value={filterValue}>
      <p> Filter </p>
      </PeopleFilter>
      <PeopleTable people={data!}></PeopleTable>
      <button className="btn" type="button" onClick={() => handlePreviousPage()}> previous </button>
      <button className="btn" type="button" onClick={() => handleNextPage()}> next </button>
    </section>
  );
}
