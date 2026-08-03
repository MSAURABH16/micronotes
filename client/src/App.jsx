import { useState, useEffect } from "react";
 
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 
  // TODO 3: on page load, fetch all notes from GET /api/notes
  // Use a non-async effect callback and call an async function inside it.
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    load();
  }, []);

  // Preserve browser-restored input values (if any) so controlled inputs
  // don't immediately clear values on reload/navigation restore.
  useEffect(() => {
    const titleEl = document.querySelector('input[placeholder="Title"]');
    const contentEl = document.querySelector('input[placeholder="Content"]');
    if (titleEl && titleEl.value ) setTitle(titleEl.value);
    if (contentEl && contentEl.value) setContent(contentEl.value);
  }, []);
 
  // TODO 4: send a POST request with { title, content }, then update the list
  const handleAddNote = async () => {

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to create note:", data);
        alert(data.message || "Failed to create note");
        return;
      }

      // server responds with { message, newNote }
      const created = data.newNote ?? data;
      setNotes((prev) => [...prev, created]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Error creating note");
    }
  };
 
  return (
    <div>
      <h1>MicroNotes</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleAddNote}>Add Note</button>
 
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}: {note.content}</li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;