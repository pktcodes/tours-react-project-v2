import { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />;
      </main>
    );
  }

  if (tours.length <= 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            type="button"
            className="btn"
            style={{ marginTop: '2rem' }}
            onClick={fetchTours}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
