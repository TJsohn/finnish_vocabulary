import { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

function App() {
    const [nameColors, setNameColors] = useState([]);
    const [words, setWords] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("");
    const [view, setView] = useState("name-color");
    
    useEffect(() => {
        fetchNameColors();
        fetchWords();
    }, []);
    
    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        }
    };

    const fetchWords = async () => {
        try {
            const response = await axios.get("/api/proxy/vocabulary", {
                params: {
                    limit: 10,
                    page: 1,
                    all: false,
                },
            });
            console.log("Fetched words:", response.data);
            setWords(response.data);
        } catch (err) {
            console.error("Error fetching words:", err.response?.data || err.message);
            setError("Failed to fetch words");
        }
    };
    
   
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/name-colors", { name, color });
            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };
    
    const handleSave = async (id) => {
        try {
            await axios.put(`/api/name-colors/${id}`, {name: newName, color: newColor});

            setEditingId(null);
            setNewName("");
            setNewColor("");

            fetchNameColors();
        } catch (err) {
            setError("Failed to save changes");
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setNewName("");
        setNewColor("");
    };

    const isSaveDisabled = () => {
        return newName === "" || newColor === "" ;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/name-colors/${id}`);
            setNameColors(nameColors.filter((item) => item.id !== id));
        } catch (err) {
            setError("Failed to delete entry");
        }
    };

    return (
        <div className="name-color-manager">
            <button
            onClick={() => setView(view === "name-color" ? "flashcard" : "name-color")}>
                {view === "name-color" ? "Switch to Flashcards" : "Switch to Name-Color Manager"}
            </button>
            <h1>{view === "name-color" ? "Name and Color Manager" : "Finnish Vocabulary"}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {view === "name-color" ? (
                <>
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {nameColors.map((item) => (
                    <li key={item.id}>
                        {editingId === item.id ? (
                            <>
                        <input type="text" value={newName} 
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Edit name"
                        />
<input type="text" value={newColor} 
onChange={(e) => setNewColor(e.target.value)}
placeholder="Edit color" 
/>
<button className="data-button" onClick={() => handleSave(item.id)} disabled={isSaveDisabled()}>Save</button>
<button className="data-button" onClick={handleCancel}>Cancel</button>
                </>
) : (
    <>
    {item.name} - {item.color} 
            <button className="data-button" onClick={()=>{
                setEditingId(item.id);
                setNewName(item.name);
                setNewColor(item.color);
            }}> Edit </button>
                        
                        <button className="data-button" onClick={() => {
                            if (window.confirm("Are you sure you want to delete?")) {
                                handleDelete(item.id);}
                            }}>Delete</button>
                    
                            </>

                        )}
                    </li>
                ))}
            </ul>
            </>
            ) : (
                <Flashcard words={words} />
            )}
            </div>
);
}
export default App;