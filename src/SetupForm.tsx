import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"

export default function SetupForm({
  onSubmit,
}: {
  onSubmit(candidates: string[]): void
}) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const candidates = value.split("\n").filter((x) => x)

        if (candidates.length) {
          onSubmit(candidates)
        } else {
          setError(true)
        }
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Setup
          </Typography>
          <Typography gutterBottom>
            Enter candidates you want to bisect, one on each line. Bisect will
            ask you to test candidates starting from the middle, and will
            continue the binary search with candidates before or after it
            depending on if you mark the candidate as bad or good
            (respectively).
          </Typography>
          <Typography gutterBottom>
            Candidates should be sorted with good candidates before bad
            candidates. Bisect needs to rely on this assumption to perform a
            sorted binary search, otherwise you would have to test every single
            candidate.
          </Typography>
          <TextField
            variant="filled"
            label="Candidates"
            multiline
            fullWidth
            value={value}
            onChange={(event) => setValue(event.target.value)}
            error={error}
            helperText={error && "At least one candidate is required"}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" color="primary">
            Start
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
