type FormType = {
  title: string
  summary: string
  location: string
  remote: boolean
  telework: boolean
  salary_min: string
  salary_max: string
  duties: string
  qualifications: string
  education: string
}

export default function JobPreview({ form }: { form: FormType }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {form.title || "Job Title Preview"}
      </h2>
      <p className="text-gray-600">
        {form.summary || "Job summary will appear here."}
      </p>

      <div className="text-sm text-gray-500">
        <p>
          <strong>Location:</strong> {form.location || "Not specified"}
        </p>
        {form.remote && <p>Remote Job Available</p>}
        {form.telework && <p>Telework Eligible</p>}
      </div>

      {(form.salary_min || form.salary_max) && (
        <p className="text-sm">
            💰 Salary:{" "}
            {form.salary_min &&
            `$${Number(form.salary_min).toLocaleString()}`}{" "}
            {form.salary_max &&
            ` - $${Number(form.salary_max).toLocaleString()}`}
        </p>
        )}


      {form.duties && (
        <div>
          <h3 className="font-semibold">Duties</h3>
          <p className="text-gray-600 whitespace-pre-line">{form.duties}</p>
        </div>
      )}

      {form.qualifications && (
        <div>
          <h3 className="font-semibold">Qualifications</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {form.qualifications}
          </p>
        </div>
      )}

      {form.education && (
        <div>
          <h3 className="font-semibold">Education</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {form.education}
          </p>
        </div>
      )}
    </div>
  )
}
