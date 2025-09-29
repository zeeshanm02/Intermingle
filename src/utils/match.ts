export function calculateMatchScore(profile: any, job: any): number {
  if (!profile) return 0

  let score = 0
  let maxScore = 0

  // --- Skills overlap ---
  const candidateSkills = profile.skills?.map((s: any) => s.name.toLowerCase()) || []
  const jobSkills = job.qualifications
    ?.split(",")
    .map((s: string) => s.trim().toLowerCase()) || []

  const overlap = candidateSkills.filter((s: string) => jobSkills.includes(s))
  score += overlap.length * 10
  maxScore += jobSkills.length * 10 // <-- each listed skill worth 10

  // --- Education check ---
  if (job.education) {
    maxScore += 20
    if (profile.education?.some((e: any) => job.education?.includes(e.degree))) {
      score += 20
    }
  }

  // --- Experience bonus ---
  maxScore += 15
  if (profile.experience?.length > 0) {
    score += 15
  }

  // --- Normalize to percentage ---
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
}
