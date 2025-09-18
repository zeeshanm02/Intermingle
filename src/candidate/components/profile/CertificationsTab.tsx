import { useState } from "react"

type Certification = {
  id: number
  name: string
  organization: string
  date: string
  url?: string
  file?: File
  fileUrl?: string
}

export default function CertificationsTab() {
  const [certs, setCerts] = useState<Certification[]>([])
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState("")
  const [date, setDate] = useState("")
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const addCert = () => {
    if (!name.trim() || !organization.trim() || !date.trim()) return

    const newCert: Certification = {
      id: Date.now(),
      name,
      organization,
      date,
      url: url.trim() || undefined,
      file: file || undefined,
      fileUrl: file ? URL.createObjectURL(file) : undefined,
    }

    setCerts([...certs, newCert])
    setName("")
    setOrganization("")
    setDate("")
    setUrl("")
    setFile(null)
  }

  const removeCert = (id: number) => {
    setCerts(certs.filter(c => c.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>

      {/* Add Certification Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Certification Name (e.g., AWS Solutions Architect)"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          value={organization}
          onChange={e => setOrganization(e.target.value)}
          placeholder="Issuing Organization"
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Credential URL (optional)"
          className="border rounded px-3 py-2"
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          className="border rounded px-3 py-2 md:col-span-2"
        />
      </div>

      <button
        onClick={addCert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Add Certification
      </button>

      {/* Saved Certifications List */}
      <ul className="space-y-4">
        {certs.map(cert => (
          <li
            key={cert.id}
            className="bg-gray-100 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-semibold">{cert.name}</p>
              <p className="text-sm text-gray-600">
                Issued by: {cert.organization}
              </p>
              <p className="text-sm text-gray-600">Date: {cert.date}</p>
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Certificate
                </a>
              )}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Credential Link
                </a>
              )}
              <button
                onClick={() => removeCert(cert.id)}
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
