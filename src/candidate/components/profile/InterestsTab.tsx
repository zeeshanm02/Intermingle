import { useState } from "react"

export default function Interests() {
  const [interests, setInterests] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(false)
  const [paragraph, setParagraph] = useState("")

  const addInterest = () => {
    if (input.trim()) {
      setInterests([...interests, input.trim()])
      setInput("")
      setAdding(false)
    }
  }

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Interests</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setAdding(!adding)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {adding ? "Cancel" : "Add Interest"}
          </button>
          <button
            onClick={() => setEditing(!editing)}
            className="text-blue-600 hover:underline"
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {/* Add Interest Form */}
      {adding && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Interest (e.g., Robotics, Hiking)"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={addInterest}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      )}

      {/* Interests List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {interests.map((interest, idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1"
          >
            <span>{interest}</span>
            {editing && (
              <button
                onClick={() => removeInterest(interest)}
                className="ml-2 text-red-500 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Paragraph Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">About My Interests</h3>
        {editing ? (
          <textarea
            value={paragraph}
            onChange={e => setParagraph(e.target.value)}
            placeholder="Write a short paragraph about your interests..."
            className="w-full border rounded px-3 py-2 h-24"
          />
        ) : (
          <p className="text-gray-700">
            {paragraph || "No description added yet."}
          </p>
        )}
      </div>
    </div>
  )
}
