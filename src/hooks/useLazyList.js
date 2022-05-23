import { useState, useEffect } from "react";

export default function useLazyList(list, pageNumber, filter, select) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [visibileList, setVisibleList] = useState([]);

  useEffect(() => {
    let visibleListLen = visibileList.length;
    setHasMore(list.length > visibleListLen);
    setIsLoading(false);
    setVisibleList(
      list
        .filter((elem) => select === "" || elem.albumId === select)
        .filter((elem) => elem.title.includes(filter))
        .slice(0, pageNumber * 25)
    );
  }, [pageNumber, filter, select]);

  return { hasMore, isLoading, visibileList };
}
