import { LinearProgress, Typography } from "@mui/material"

function getSteps(length: number) {
  return Math.ceil(Math.log2(length))
}

function pluralize(word: string, count: number) {
  const suffix = count === 1 ? "" : "s"
  return `${count} ${word}${suffix}`
}

export default function Progress({
  candidatesCount,
  currentCandidatesCount,
}: {
  candidatesCount: number
  currentCandidatesCount: number
}) {
  return (
    <>
      <Typography>
        {currentCandidatesCount ? (
          <>
            {pluralize("candidate", currentCandidatesCount)} left to test after
            this (roughly {pluralize("step", getSteps(currentCandidatesCount))})
          </>
        ) : (
          "Completed"
        )}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={
          currentCandidatesCount === candidatesCount
            ? 0
            : ((getSteps(candidatesCount) - getSteps(currentCandidatesCount)) /
                getSteps(candidatesCount)) *
              100
        }
      />
    </>
  )
}
