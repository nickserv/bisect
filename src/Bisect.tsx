import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import { useState } from "react"
import Progress from "./Progress"

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
          <Progress
            candidatesCount={candidates.length}
            currentCandidatesCount={last + 1 - first}
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
