import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const FetchData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  // 🔹 Filter beers based on search input
  const filteredBeers = data.filter((beer) =>
    beer.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1
        className="text-center mb-4"
        style={{ backgroundColor: "teal", color: "white" }}
      >
        🍺 🍺 Beers Collection 🍺 🍺
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search beers..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      {/* Beer Cards */}
      <div className="row">
        {filteredBeers.length > 0 ? (
          filteredBeers.map((beer) => (
            <div key={beer.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 d-flex flex-column shadow-sm">
                <img
                  src={beer.image}
                  alt={beer.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5
                    className="card-title text-center"
                    style={{ borderTop: "5px solid black" }}
                  >
                    {beer.name}
                  </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No beers found! 🍻</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
