import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import icon from "./assets/icon.png";

function Movies() {
    const { mood } = useParams();
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const moodToGenres = {
        cheerful: [35, 10749],    // Comedy, Romance
        gloomy: [18, 9648],       // Drama, Mystery
        humorous: [35],           // Comedy
        romantic: [10749, 18],    // Romance, Drama
        lonely: [10751, 18],      // Family, Drama
        fearful: [27, 878],       // Horror, Sci-Fi
        angry: [28, 53],          // Action, Thriller
        sleepy: [16, 10402],      // Animation, Music
        thrillseeking: [28, 12],  // Action, Adventure
        reflective: [10402],      // Music
        melancholic: [18],        // Drama
        chill: [10770, 35],       // TV Movie, Comedy
        weird: [14, 35],          // Fantasy, Comedy
        horny: [53, 10749],       // Thriller, Romance
        tense: [53, 9648],        // Thriller, Mystery
        thoughtful: [10402],      // Music
        playful: [35],            // Comedy
    };

    useEffect(() => {
        const genres = moodToGenres[mood.toLowerCase()];
        if (genres) {
            const genreIds = genres.join(',');
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIds}&sort_by=popularity.desc`;
            axios.get(url)
                .then((response) => {
                    setMovies(response.data.results || []);
                    setCurrentIndex(0);
                    setError(null);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                    setError("Failed to fetch movies. Please try again later.");
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError("Invalid mood specified.");
        }
    }, [mood, apiKey]);

    useEffect(() => {
        if (movies.length > 0) {
            const fetchTrailer = async () => {
                const movieId = movies[currentIndex].id;
                const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
                try {
                    const response = await axios.get(trailerUrl);
                    const trailers = response.data.results;
                    setTrailerKey(trailers.length > 0 ? trailers[0].key : null);
                } catch (error) {
                    console.error("Error fetching trailer: ", error);
                    setTrailerKey(null);
                }
            };
            fetchTrailer();
        }
    }, [movies, currentIndex, apiKey]);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % movies.length;
        setCurrentIndex(nextIndex);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="bg-dark py-3 min-vh-100 d-flex flex-column align-items-center">
            <div className='p-2 mt-3 mb-2 rounded d-flex align-items-center header-div' style={{ maxWidth: "700px", width: "100%", backgroundColor: "#021526", color: "white" }}>
                <div>
                    <Link to={"/"}>
                        <img src={icon} alt="icon" style={{ width: "50px" }} />
                    </Link>
                </div>
                <div className='flex-grow-1 text-center'>
                    <p className='mb-0'>Feeling {mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
                </div>
            </div>

            <div>
                {loading ? (
                    <p className="text-white">Loading movies...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : movies.length > 0 ? (
                    <div className="card p-3" style={{ 
                        maxWidth: "700px", 
                        width: "100%", 
                        backgroundColor: "#021526", 
                        color: "white", 
                        minWidth: "300px" 
                    }}>
                        <div className="d-flex justify-content-center">
                            {trailerKey ? (
                                <iframe
                                    width="100%"
                                    height="auto"
                                    style={{ aspectRatio: '16/9' }}
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    title={movies[currentIndex].title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <p>No trailer available.</p>
                            )}
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{movies[currentIndex].title}</h4>
                            <p className="card-text">{movies[currentIndex].release_date}</p>
                            <p>{movies[currentIndex].overview}</p>
                        </div>

                        <div className="mt-3 text-center">
                            <button className="btn btn-danger mx-2 w-25 fw-bold" onClick={handlePrevious} disabled={movies.length === 0}>⬅ Back</button>
                            <button className="btn btn-danger mx-2 w-25 fw-bold" onClick={handleNext} disabled={movies.length === 0}>Next ➡</button>
                        </div>
                    </div>
                ) : (
                    <p>No movies found for this mood.</p>
                )}
            </div>
        </div>
    );
}

export default Movies;
