import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newItem, setNewItem] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      if (!response.ok) throw new Error('Failed to create item')
      setNewItem({ name: '', description: '' })
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div className="header">
        <h1>Node.js + SQLite App</h1>
      </div>
      
      <div className="container">
        <div className="card">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="input"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                className="input"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <button type="submit" className="button">Add Item</button>
          </form>
        </div>

        {error && <div className="error">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="grid">
            {items.map(item => (
              <div key={item.id} className="card">
                <h3>{item.name}</h3>
                <p>{item.description || 'No description'}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Created: {new Date(item.created_at).toLocaleDateString()}
                </p>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="button button-secondary"
                  style={{ marginTop: '1rem' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App