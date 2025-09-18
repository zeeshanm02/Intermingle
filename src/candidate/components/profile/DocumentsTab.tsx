import { useState } from "react"

type Doc = {
  id: number
  name: string
  file: File
  url: string
}

export default function Documents() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [docName, setDocName] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (!docName.trim() || !file) return

    const newDoc: Doc = {
      id: Date.now(),
      name: docName,
      file,
      url: URL.createObjectURL(file), // local preview, replace with Supabase URL later
    }

    setDocs([...docs, newDoc])
    setDocName("")
    setFile(null)
  }

  const removeDoc = (id: number) => {
    setDocs(docs.filter(d => d.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Documents</h2>

      {/* Upload Form */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={docName}
          onChange={e => setDocName(e.target.value)}
          placeholder="Document Name (e.g., Resume)"
          className="flex-1 border rounded px-3 py-2"
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      {/* Uploaded Docs List */}
      <ul className="space-y-2">
        {docs.map(doc => (
          <li
            key={doc.id}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <span>{doc.name}</span>
            <div className="flex gap-3">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
              <button
                onClick={() => removeDoc(doc.id)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
