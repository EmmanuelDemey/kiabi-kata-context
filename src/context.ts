import {createContext, useContext} from "react";

export type PeopleLikeContextType = {
    person: string[],
    like: (url: string) => void,
    dislike: (url: string) => void,
    isLiked: (url: string) => boolean;
  }
  
  const PeopleLikeContext = createContext<PeopleLikeContextType>({
    person: [],
    like: function (url: string): void {
      throw new Error("Function not implemented.");
    },
    dislike: function (url: string): void {
      throw new Error("Function not implemented.");
    },
    isLiked: function (url: string): boolean {
      throw new Error("Function not implemented.");
    }
  })

  export const PeopleLikeProvider = PeopleLikeContext.Provider;
  export const usePeopleLike = () => useContext(PeopleLikeContext);