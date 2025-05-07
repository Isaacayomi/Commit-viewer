import { useState, useEffect } from "react";
import key from "./key";
import Loader from "./Loader";
import CommitSuggestionButton from "./CommitSuggestionButton";
import ShowCommitButton from "./ShowCommitButton";
import OptionText from "./OptionText";
import SearchBar from "./SearchBar";

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
    <div className="max-w-width-styling w-[90%] mx-auto text-center pt-8  sm:max-w-sm md:max-w-md ">
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
export default HomePage;
