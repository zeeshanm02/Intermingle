import { useState } from "react"

type Skill = {
  name: string
  level: "Novice" | "Intermediate" | "Experienced" | "Expert"
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [input, setInput] = useState("")
  const [level, setLevel] = useState<Skill["level"]>("Novice")
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)

  const addSkill = () => {
    if (input.trim()) {
      setSkills([...skills, { name: input.trim(), level }])
      setInput("")
      setLevel("Novice")
      setAdding(false)
    }
  }

  const removeSkill = (name: string) => {
    setSkills(skills.filter(s => s.name !== name))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setAdding(!adding)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {adding ? "Cancel" : "Add Skill"}
          </button>
          <button
            onClick={() => setEditing(!editing)}
            className="text-blue-600 hover:underline"
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Skill (e.g., JavaScript)"
            className="flex-1 border rounded px-3 py-2"
          />
          <select
            value={level}
            onChange={e => setLevel(e.target.value as Skill["level"])}
            className="border rounded px-3 py-2"
          >
            <option>Novice</option>
            <option>Intermediate</option>
            <option>Experienced</option>
            <option>Expert</option>
          </select>
          <button
            onClick={addSkill}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      )}

      {/* Display List */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1"
          >
            <span className="mr-2 font-medium">{skill.name}</span>
            <span
              className={`text-sm px-2 py-0.5 rounded-full ${
                skill.level === "Novice"
                  ? "bg-gray-300 text-gray-800"
                  : skill.level === "Intermediate"
                  ? "bg-blue-200 text-blue-800"
                  : skill.level === "Experienced"
                  ? "bg-green-200 text-green-800"
                  : "bg-purple-200 text-purple-800"
              }`}
            >
              {skill.level}
            </span>
            {editing && (
              <button
                onClick={() => removeSkill(skill.name)}
                className="ml-2 text-red-500 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
