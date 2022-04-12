import React from "react";

const Search = () => {
  const [platforms, setPlatforms] = useState();
  const [platformType, setPlatformType] = useState();
  const [type, setType] = useState();
  const [sortby, setSortBy] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (platformType !== undefined) {
        try {
          const response = await axios.get(
            // `http://localhost:4000/?platforms=${platforms}`
            `https://api.rawg.io/api/games/?key=ee7acd3aea974d95b29d55f9c60f5960&platformType=${platformType}`
          );
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(
            "https://api.rawg.io/api/platforms?key=ee7acd3aea974d95b29d55f9c60f5960"
          );
          setPlatforms(response.data);
          console.log(platforms);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get(
            "https://api.rawg.io/api/platforms?key=ee7acd3aea974d95b29d55f9c60f5960"
          );
          setPlatforms(response.data);
        } catch (error) {
          console.log(error.message);
        }
        try {
          const response = await axios.get(
            `http://localhost:4000/?search=${searchGame}`
          );
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [searchGame]);
  return (
    <div>
      {/* Filters */}

      <section className="filters-container">
        <div>
          <select
            onChange={(event) => setPlatformType(event.target.value)}
            name="Plateform"
            id="platform-select"
          >
            <option value="">Plateform : All</option>

            {platforms.results.map((platform, index) => {
              return (
                <option key={index} value={platform.id}>
                  {platform.name}
                </option>
              );
            })}
          </select>
          <select
            onChange={(event) => setType(event.target.value)}
            name="Type"
            id="type-select"
          >
            <option value="">Type : All</option>
            <option value="">Type :</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="indie">Indie</option>
            <option value="shooter">Shooter</option>
            <option value="sports">Sport</option>
            <option value="racing">Racing</option>
            <option value="role-playing-games-rpg">RPG</option>
            <option value="puzzle">Puzzle</option>
          </select>
        </div>
        <div>
          <select
            onChange={(event) => setSortBy(event.target.value)}
            name="Sort by"
            id="sort-select"
          >
            <option value="">Sort by : </option>
            <option value="name">Name</option>
            <option value="released">Released</option>
            <option value="added">Added</option>
            <option value="created">Created</option>
            <option value="rating">Rating</option>
            <option value="metacritic">Metacritic</option>
          </select>
          <button className="filter-button">Go filters !</button>
        </div>
      </section>
    </div>
  );
};

export default Search;
