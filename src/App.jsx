import { Link, useNavigate } from 'react-router-dom';
import icon from "./assets/icon.png";

function Home() {
    const navigate = useNavigate();

    const handleMoodClick = (mood) => {
        navigate(`/movies/${mood}`);
    };

    return (
        <main className='p-5 min-vh-100' style={{ backgroundColor: "#021526", fontFamily: 'Raleway, sans-serif' }}>
            <h1 className='text-white text-center fw-bolder mb-4'>Discover Movies that Match Your Mood!</h1>
            <p className='text-white text-center mb-4'>How are you feeling now?</p>
            <div className='container px-5'>
                <div className='row justify-content-center'>
                    {/* Moods Row */}
                    {[
                        { mood: 'cheerful', emoji: '😊' },
                        { mood: 'reflective', emoji: '😌' },
                        { mood: 'gloomy', emoji: '😔' },
                        { mood: 'humorous', emoji: '😂' },
                        { mood: 'melancholy', emoji: '😢' },
                        { mood: 'idyllic', emoji: '😇' },
                        { mood: 'chill', emoji: '😌' },
                        { mood: 'romantic', emoji: '😍' },
                        { mood: 'weird', emoji: '😜' },
                        { mood: 'horny', emoji: '😏' },
                        { mood: 'sleepy', emoji: '😴' },
                        { mood: 'angry', emoji: '😡' },
                        { mood: 'fearful', emoji: '😱' },
                        { mood: 'lonely', emoji: '😞' },
                        { mood: 'tense', emoji: '😬' },
                        { mood: 'thoughtful', emoji: '🤔' },
                        { mood: 'thrillseeking', emoji: '😎' },
                        { mood: 'playful', emoji: '😜' },
                    ].map(({ mood, emoji }) => (
                        <div className="col-6 col-md-4 col-lg-3 mb-3" key={mood}>
                            <button className="btn btn-outline-danger fw-bold text-white w-100 h-100 py-4" 
                                    onClick={() => handleMoodClick(mood)}>
                                {emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed-bottom py-2">
                <p className="text-center text-white fw-bolder mb-0">
                    Made by: <span className="text-danger">Abderrazzak</span>
                </p>
            </div>
        </main>
    );
}

export default Home;
