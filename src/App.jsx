function App() {
  return (
    <div>
      <NavBar />
      <HomePage />
    </div>
  );
}

function NavLogo() {
  return (
    <img
      src="images/commitviewer-logo.png"
      alt="logo"
      className="block m-auto py-4"
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
      <CommitSuggestionButton />
    </div>
  );
}

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        placeholder="E.g. facebook/react"
        className="max-w-width-styling w-[90%] mx-auto pt-[0.9375rem] pb-[0.9375rem] px-4 outline-none bg-[#DFE4EA] rounded-lg mb-6"
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

function ShowCommitButton() {
  return (
    <button className="max-w-width-styling w-[90%] text-center rounded-lg bg-[#F3663F] py-4 mb-8 text-white text-xl font-[600]  leading-[1.75rem]">
      See commits 🚀
    </button>
  );
}

function CommitSuggestionButton() {
  return (
    <button className="mb-2 py-2 px-4 bg-dark-blue text-white font-[600] rounded-lg">
      django/django
    </button>
  );
}

function CommitListsNav() {
  return (
    <div>
      <NavLogo />
      <SearchBar />
      <ShowCommitButton />
    </div>
  );
}

function ViewPage() {
  return (
    <div>
      <h3>microsoft/vscode</h3>
    </div>
  );
}

function SearchResult() {
  return (
    <div>
      <div>
        <img src="images/git-commit-view-img" alt="user avatar" />
        <h3>Gaearon</h3>
      </div>
      <p>Log all errors to console.error by default (#21130)</p>
      <p>23:30 28/04/2021</p>
    </div>
  );
}

function Loader() {
  return <div>Loading...</div>;
}

export default App;
