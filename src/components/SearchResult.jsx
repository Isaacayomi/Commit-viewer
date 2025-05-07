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

export default SearchResult;
