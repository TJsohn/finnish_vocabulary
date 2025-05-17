import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("");
    
    useEffect(() => {
        fetchNameColors();
    }, []);
    
    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
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
        <div style={{ padding: "20px" }}>
            <h1>Name and Color Manager</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
                        <button onClick={() => handleSave(item.id)} disabled={isSaveDisabled()}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                        {item.name} - {item.color} 
                        
                    <button onClick={()=>{
                        setEditingId(item.id);
                        setNewName(item.name);
                        setNewColor(item.color);
                        }}>Edit</button>
                        
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to delete?")) {
                                handleDelete(item.id);}
                            }}>Delete</button>

                
                    
                            </>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;