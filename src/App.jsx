import { useState } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ViewPage from "./components/ViewPage";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showViewPage, setShowViewPage] = useState(false);
  const [commitData, setCommitData] = useState([]);

  return (
    <div>
      {!showViewPage && searchResult.length === 0 ? (
        <>
          <NavBar />
          <HomePage
            searchResult={searchResult}
            onSetResult={setSearchResult}
            loading={isLoading}
            setIsLoading={setIsLoading}
            query={query}
            setQuery={setQuery}
            setShowViewPage={setShowViewPage}
            setCommitData={setCommitData}
          />
        </>
      ) : (
        <>
          <ViewPage
            searchResult={searchResult}
            onSetResult={setSearchResult}
            loading={isLoading}
            setIsLoading={setIsLoading}
            query={query}
            setQuery={setQuery}
            showViewPage={showViewPage}
            setShowViewPage={setShowViewPage}
            commitData={commitData}
          />
        </>
      )}
    </div>
  );
}

export default App;
