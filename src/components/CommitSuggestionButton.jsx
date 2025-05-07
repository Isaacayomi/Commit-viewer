import key from "./key";
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

export default CommitSuggestionButton;
