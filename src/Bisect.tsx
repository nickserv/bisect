import {
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material"
import { useState } from "react"

function getSteps(length: number) {
  return Math.ceil(Math.log2(length))
}

function pluralize(word: string, count: number) {
  const suffix = count === 1 ? "" : "s"
  return `${count} ${word}${suffix}`
}

export default function Bisect({
  candidates,
  reset,
}: {
  candidates: string[]
  reset(): void
}) {
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(candidates.length - 1)

  const bisecting = first <= last
  const middle = Math.floor((first + last) / 2)

  const candidatesCount = candidates.length
  const currentCandidatesCount = last + 1 - first

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {bisecting
              ? "Current Candidate"
              : first === candidates.length
              ? "All Candidates Good"
              : "First Bad Candidate"}
          </Typography>
          <Typography gutterBottom>
            {bisecting ? candidates[middle] : candidates[middle + 1]}
          </Typography>
          <Typography>
            {currentCandidatesCount ? (
              <>
                {pluralize("candidate", currentCandidatesCount)} left to test
                after this (roughly{" "}
                {pluralize("step", getSteps(currentCandidatesCount))})
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
                : ((getSteps(candidatesCount) -
                    getSteps(currentCandidatesCount)) /
                    getSteps(candidatesCount)) *
                  100
            }
          />
        </CardContent>
        <CardActions disableSpacing>
          <Button
            color="error"
            onClick={() => setLast(middle - 1)}
            disabled={!bisecting}
          >
            Bad
          </Button>
          <Button
            color="success"
            onClick={() => setFirst(middle + 1)}
            disabled={!bisecting}
          >
            Good
          </Button>
          <Button
            onClick={() => {
              setFirst(0)
              setLast(candidates.length - 1)
            }}
          >
            Restart
          </Button>
          <Button onClick={reset}>Reset</Button>
        </CardActions>
      </Card>
    </>
  )
}
