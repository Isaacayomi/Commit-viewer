import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import ViewPageNav from "./ViewPageNav";
import Loader from "./Loader";

function ViewPage({
  searchResult,
  commitData,
  setQuery,
  setIsLoading,
  setCommitData,
  setShowViewPage,
  onSetResult,
}) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (searchResult && searchResult.length > 0) {
      const authorLogin = searchResult[0].author.login;
      console.log(authorLogin);
      setResult(authorLogin);
    } else {
      const authorLogin = commitData[0].author.login;
      setResult(authorLogin);
    }
    setLoading(false);
  }, [searchResult, commitData]);

  return (
    <div className="mx-auto  sm:max-w-lg md:max-w-xl">
      <div>
        <ViewPageNav
          setQuery={setQuery}
          setIsLoading={setIsLoading}
          setCommitData={setCommitData}
          setShowViewPage={setShowViewPage}
          onSetResult={onSetResult}
        />
      </div>
      <>
        {loading && <Loader />}
        <h3 className="text-dark-blue text-4xl text-center mb-5">{result}</h3>
        <SearchResult searchResult={searchResult} />
      </>
    </div>
  );
}
export default ViewPage;
