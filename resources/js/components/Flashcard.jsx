import React, {useState, useEffect} from "react";
import axios from 'axios';
import './Flashcard.css';

function Flashcard({words}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEnglish, setShowEnglish] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get("/api/favorites");
                setFavorites(response.data);
            } catch (err) {
                console.error("Error fetching favorites:", err.response?.data || err.message);
            }
        };
        fetchFavorites();
    }, []);

    if (!words || words.length === 0) {
        return <p>No words available for flashcards.</p>;
    }

    const currentWord = words[currentIndex];

    const finnish = currentWord?.finnish || "N/A";
    const english = currentWord?.english || "N/A";

    const toggleFavorite = async (word) => {
        const favorite = favorites.find((fav) => fav.word_id === word.id);

        if (favorite) {
            try {
                await axios.delete(`/api/favorites/${favorite.id}`);
                console.log("Favorite removed:", favorite);
                setFavorites((prev) => prev.filter((fav) => fav.word_id !== word.id));
            } catch (err) {
                console.error("Error removing favorite:", err.response?.data || err.message);
            }
        } else {

    
        try {
            const response=await axios.post("/api/favorites", {
                word_id: word.id,
                finnish: word.finnish,
                english: word.english,
                example: word.example,
            });
            console.log("Favorite saved:", response.data);
            setFavorites((prev) => [...prev, response.data]);
        } catch (err) {
            console.error("Error saving favorite:", err.response?.data || err.message);
        }
    }
    };

    const isFavorite = (word) => {
        return favorites.some((fav) => fav.word_id === word.id);
    };


    return (
        <div className="flashcard-container">
            <div
                className="flashcard"
            onClick={() => setShowEnglish(!showEnglish)}>
                {showEnglish ? currentWord?.english : currentWord?.finnish}
            </div>
                <div className="flashcard-buttons">
            <button onClick={()=>{
                setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
            setShowEnglish(false);
            }}>Previous</button>
                <button onClick={()=>{
                    setCurrentIndex((prev) => (prev + 1) % words.length);
                setShowEnglish(false);
                }}>Next</button>
            </div>
            <p className={`favorite-icon ${isFavorite(currentWord) ? "favorited" : ""}`} onClick={() => toggleFavorite(currentWord)} style={{ cursor: "pointer", fontSize: "24px", }}>
                {isFavorite(currentWord) ? "♥️" : "♡"}
            </p>
            

        </div>
    );
}

export default Flashcard;