import { useState } from "react"

export default function CareerGoals() {
  const [shortGoals, setShortGoals] = useState<string[]>([])
  const [longGoals, setLongGoals] = useState<string[]>([])
  const [shortInput, setShortInput] = useState("")
  const [longInput, setLongInput] = useState("")
  const [mission, setMission] = useState("")
  const [missionDraft, setMissionDraft] = useState("")

  // Add Goals
  const addShortGoal = () => {
    if (shortInput.trim()) {
      setShortGoals([...shortGoals, shortInput.trim()])
      setShortInput("")
    }
  }

  const addLongGoal = () => {
    if (longInput.trim()) {
      setLongGoals([...longGoals, longInput.trim()])
      setLongInput("")
    }
  }

  // Remove Goals
  const removeShortGoal = (goal: string) => {
    setShortGoals(shortGoals.filter(g => g !== goal))
  }

  const removeLongGoal = (goal: string) => {
    setLongGoals(longGoals.filter(g => g !== goal))
  }

  // Save Mission
  const saveMission = () => {
    setMission(missionDraft)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Career Goals</h2>

      {/* Short-Term Goals */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Short-Term Goals</h3>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {shortGoals.map((goal, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{goal}</span>
              <button
                onClick={() => removeShortGoal(goal)}
                className="text-red-500 font-bold ml-3"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={shortInput}
            onChange={e => setShortInput(e.target.value)}
            placeholder="Add a short-term goal"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={addShortGoal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Long-Term Goals */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Long-Term Goals</h3>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {longGoals.map((goal, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{goal}</span>
              <button
                onClick={() => removeLongGoal(goal)}
                className="text-red-500 font-bold ml-3"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={longInput}
            onChange={e => setLongInput(e.target.value)}
            placeholder="Add a long-term goal"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={addLongGoal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Personal Mission */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Personal Mission</h3>
        <textarea
          value={missionDraft}
          onChange={e => setMissionDraft(e.target.value)}
          placeholder="Write your personal mission here..."
          className="w-full border rounded px-3 py-2 h-24 mb-2"
        />
        <button
          onClick={saveMission}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        {mission && (
          <p className="mt-3 text-gray-700">
            <strong>Saved Mission:</strong> {mission}
          </p>
        )}
      </div>
    </div>
  )
}
