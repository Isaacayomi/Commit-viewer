import { useEffect, useState } from "react";

const key = import.meta.env.VITE_GITHUB_COMMIT_TOKEN;

function App() {
  return (
    <div>
      <NavBar />
      <HomePage />
      {/* <ViewPage /> */}
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

function HomePage() {
  const [repoButton, setRepoButton] = useState();

  useEffect(
    function () {
      async function fetchRepo() {
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
        setRepoButton(items.slice(0, 5));
      }
      fetchRepo();
    },
    [repoButton]
  );
  return (
    <div className="max-w-width-styling w-[90%] mx-auto text-center pt-8">
      <header className=" text-dark-blue text-[3.5rem] font-[600] tracking-[-0.15rem] leading-[3.875rem] pb-6">
        Discover the world of code
      </header>

      <p className="pb-16 text-xl font-[400] tracking-[-0.025rem] leading-[1.75rem] ">
        Explore open source projects from Github, and read their commit history
        to see the story of how they were built.
      </p>

      <SearchBar />
      <ShowCommitButton />
      <OptionText />
      <CommitSuggestionButton repoButton={repoButton} />
    </div>
  );
}

function SearchBar({ className = " " }) {
  return (
    <div>
      <input
        type="text"
        placeholder="E.g. facebook/react"
        className={`max-w-width-styling w-[90%] mx-auto pt-[0.9375rem] pb-[0.9375rem] px-4 outline-none bg-[#DFE4EA] rounded-lg mb-6 ${className}`}
      />
    </div>
  );
}

function OptionText() {
  return (
    <p className="w-[11.25rem] mx-auto text-sm tracking-[-0.025rem] leading-5 pb-8">
      Or pick one of these suggested repos
    </p>
  );
}

function ShowCommitButton({ className = "" }) {
  return (
    <button
      className={`max-w-width-styling w-[90%] text-center rounded-lg bg-[#F3663F] py-4 mb-8 text-white text-xl font-[600]  leading-[1.75rem] ${className}`}
    >
      See commits 🚀
    </button>
  );
}

function CommitSuggestionButton({ repoButton }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col gap-2">
      {repoButton?.length > 0 &&
        repoButton.map((btn, index) => (
          <button
            key={index}
            className="mb-2 py-2 px-4 bg-dark-blue text-white font-[600] rounded-lg"
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

function ViewPage() {
  return (
    <div>
      <div>
        <ViewPageNav />
      </div>

      <h3 className="text-dark-blue text-4xl text-center">microsoft/vscode</h3>
      <SearchResult />
    </div>
  );
}

function SearchResult() {
  return (
    <div className="px-2 pb-3">
      <div className="flex ">
        <img
          src="images/git-commit-view-img.png"
          alt="user avatar"
          className="w-7 h-7"
        />
        <h3>Gaearon</h3>
        <p className="ml-auto">23:30 28/04/2021</p>
      </div>
      <p className="pb-2">
        Log all errors to console.error by default (#21130)
      </p>
    </div>
  );
}

function Loader() {
  return <div>Loading...</div>;
}

export default App;
