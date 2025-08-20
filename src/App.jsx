"use client";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-box">
      <h2>⚠️ Oops, something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>🔄 Try again</button>
    </div>
  );
}

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="loading"></div>;

  return (
    <div className="grid">
      {data.slice(0, 20).map((todo) => (
        <div
          key={todo.id}
          className={`card ${todo.completed ? "done" : "pending"}`}
        >
          <h3>{todo.title}</h3>
          <p>Status: {todo.completed ? "✅ Completed" : "⏳ Pending"}</p>
          <small>
            ID: {todo.id} | User: {todo.userId}
          </small>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <DataFetcher />
      </ErrorBoundary>
    </div>
  );
}

export default App;
