import { useEffect, useState } from "react";

const key = import.meta.env.VITE_GITHUB_COMMIT_TOKEN;

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showViewPage, setShowViewPage] = useState(false);
  const [commitData, setCommitData] = useState([]);

  // return (
  //   <div>
  //     {searchResult.length === 0 && (
  //       <>
  //         <NavBar />
  //         <HomePage
  //           searchResult={searchResult}
  //           onSetResult={setSearchResult}
  //           loading={isLoading}
  //           setIsLoading={setIsLoading}
  //           query={query}
  //           setQuery={setQuery}
  //           showViewPage={showViewPage}
  //           setShowView={setShowViewPage}
  //         />
  //       </>
  //     )}
  //     {searchResult.length !== 0 && (
  //       <ViewPage
  //         searchResult={searchResult}
  //         onSetResult={setSearchResult}
  //         loading={isLoading}
  //         isLoading={setIsLoading}
  //         query={query}
  //         setQuery={setQuery}
  //         showViewPage={showViewPage}
  //         setShowView={setShowViewPage}
  //       />
  //     )}
  //   </div>
  // );

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
            setShowViewPage={setShowViewPage}
            commitData={commitData}
          />
        </>
      )}
    </div>
  );
}

function NavLogo({ className = "" }) {
  return (
    <img
      src="images/commitviewer-logo.png"
      alt="logo"
      className={`block m-auto py-4 ${className}`}
    />
  );
}

function NavBar() {
  return (
    // className="w-[28.75rem] "
    <nav>
      <NavLogo />
      <div className="flex justify-center items-center gap-8 ">
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </div>
    </nav>
  );
}

function HomePage({
  searchResult,
  onSetResult,
  loading,
  setIsLoading,
  query,
  setQuery,
  setShowViewPage,
  setCommitData,
}) {
  const [repoButton, setRepoButton] = useState();

  useEffect(function () {
    async function fetchRepo() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&page=20&per_page=15
`,
        {
          header: { Authorization: `Bearer ${key}` },
        }
      );
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      console.log(data.items);
      const items = data.items.map((item) => item.full_name);
      setIsLoading(false);
      setRepoButton(items.slice(1, 5));
    }
    fetchRepo();
  }, []);
  return (
    <div className="max-w-width-styling w-[90%] mx-auto text-center pt-8">
      <header className=" text-dark-blue text-[3.5rem] font-[600] tracking-[-0.15rem] leading-[3.875rem] pb-6">
        Discover the world of code
      </header>

      <p className="pb-16 text-xl font-[400] tracking-[-0.025rem] leading-[1.75rem] ">
        Explore open source projects from Github, and read their commit history
        to see the story of how they were built.
      </p>

      <SearchBar
        query={query}
        setQuery={setQuery}
        setIsLoading={setIsLoading}
        setCommitData={setCommitData}
        setShowViewPage={setShowViewPage}
        onSetResult={onSetResult}
      />
      <ShowCommitButton
        query={query}
        setShowViewPage={setShowViewPage}
        setCommitData={setCommitData}
        onSetResult={onSetResult}
        setIsLoading={setIsLoading}
        loading={loading}
      />

      <OptionText />
      {loading && <Loader />}
      <CommitSuggestionButton
        repoButton={repoButton}
        searchResult={searchResult}
        onSetResult={onSetResult}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

function SearchBar({
  className = " ",
  query,
  setQuery,
  setShowViewPage,
  setCommitData,
  onSetResult,
  setIsLoading,
}) {
  async function fetchRepo(query) {
    setIsLoading(true);
    const res = await fetch(`https://api.github.com/repos/${query}/commits`, {
      header: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    setCommitData(data);
    onSetResult(data);
    console.log(`This is data`, data);
    setIsLoading(false);
    query.length === 0 ? setShowViewPage(false) : setShowViewPage(true);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchRepo(query);
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="E.g. facebook/react"
        className={`max-w-width-styling w-[90%] mx-auto pt-[0.9375rem] pb-[0.9375rem] px-4 outline-none bg-[#DFE4EA] rounded-lg mb-6 ${className}`}
      />
    </form>
  );
}

function OptionText() {
  return (
    <p className="w-[11.25rem] mx-auto text-sm tracking-[-0.025rem] leading-5 pb-8">
      Or pick one of these suggested repos
    </p>
  );
}

function ShowCommitButton({
  className = "",
  query,
  setShowViewPage,
  setCommitData,
  onSetResult,
  setIsLoading,
}) {
  async function fetchRepo(query) {
    setIsLoading(true);
    const res = await fetch(`https://api.github.com/repos/${query}/commits`, {
      header: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    setCommitData(data);
    onSetResult(data);
    console.log(`This is data`, data);
    setIsLoading(false);
    query.length === 0 ? setShowViewPage(false) : setShowViewPage(true);
  }

  return (
    <button
      onClick={() => fetchRepo(query)}
      className={`max-w-width-styling w-[90%] text-center rounded-lg bg-[#F3663F] py-4 mb-8 text-white text-xl font-[600]  leading-[1.75rem] ${className}`}
    >
      See commits 🚀
    </button>
  );
}

function CommitSuggestionButton({ setIsLoading, repoButton, onSetResult }) {
  const fetchCommit = async (fullName) => {
    setIsLoading(true);
    const res = await fetch(
      `https://api.github.com/repos/${fullName}/commits`,
      {
        header: { Authorization: `Bearer ${key}` },
      }
    );
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    onSetResult(data);
    setIsLoading(false);
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-2">
      {repoButton?.length > 0 &&
        repoButton.map((btn, index) => (
          <button
            key={index}
            className="mb-2 py-2 px-4 bg-dark-blue text-white font-[600] rounded-lg"
            onClick={() => fetchCommit(btn)}
          >
            {btn}
          </button>
        ))}
    </div>
  );
}

function ViewPageNav() {
  return (
    <>
      <NavLogo />
      <div className="flex justify-between items-center flex-row pt-1 ">
        <SearchBar className="text-[0.9rem] pb-[0.8rem] pt-[0.8rem]" />
        <ShowCommitButton className="py-[0.5rem] text-[0.9rem]" />
      </div>
    </>
  );
}

function ViewPage({ searchResult, commitData }) {
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
    <div>
      <div>
        <ViewPageNav />
      </div>

      <h3 className="text-dark-blue text-4xl text-center mb-5">{result}</h3>
      {loading && <Loader />}
      <SearchResult searchResult={searchResult} />
    </div>
  );
}

function SearchResult({ searchResult }) {
  return (
    <div className="px-2 pb-3">
      {searchResult.map((result) => {
        return (
          <div>
            <div key={result.sha} className="flex pb-0 h-auto">
              <img
                src={result.author.avatar_url}
                alt="user avatar"
                className="w-7 h-7 rounded-xl"
              />
              <h3 className="mb-8">{result.committer.login}</h3>
              <p className="ml-auto">
                {new Date(result.commit.author.date).toLocaleTimeString()}{" "}
                {new Date(result.commit.author.date).toLocaleDateString()}
              </p>
            </div>
            <p className="mb-2 mt-[-1rem] pb-10 w-[200px] text-sm">
              {result.commit.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function Loader() {
  return <div className="loader"></div>;
}
export default App;
