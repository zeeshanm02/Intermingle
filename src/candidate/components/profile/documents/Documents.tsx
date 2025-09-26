// src/candidate/components/profile/Documents.tsx
import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabaseClient"
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  type Document,
} from "../../../services/profileServices/documentsService"
import { Card } from "../../../../components/layout/Card"

export default function Documents() {
  const [documents, setDocuments] = useState<(Document & { signedUrl?: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await getDocuments()
      setDocuments(data)
      setLoading(false)
    }
    fetchDocs()
  }, [])

  const handleUpload = async () => {
    if (files.length === 0 || !name) return

    const uploadedDocs = await Promise.all(
      files.map(async (file) => {
        const doc = await uploadDocument(name, file)

        const { data: signed } = await supabase.storage
          .from("documents")
          .createSignedUrl(doc.file_path, 60 * 60)

        return { ...doc, signedUrl: signed?.signedUrl }
      })
    )

    setDocuments([...uploadedDocs, ...documents])
    setName("")
    setFiles([])
  }

  const handleDelete = async (id: string) => {
    await deleteDocument(id)
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <Card title="Documents">
      {/* Upload form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleUpload()
        }}
        className="flex flex-col gap-3 mb-4"
      >
        <input
          type="text"
          placeholder="Document name (e.g. Resume, Certificate)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="border p-2 rounded border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          Upload
        </button>
      </form>

      {/* Documents list */}
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc, index) => (
            <li
              key={doc.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm border 
                ${index % 3 === 0 ? "bg-blue-50" : index % 3 === 1 ? "bg-green-50" : "bg-yellow-50"}`}
            >
              <div>
                <p className="font-semibold">{doc.name}</p>
                <a
                  href={doc.signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Document
                </a>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
