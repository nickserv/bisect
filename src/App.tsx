import { Container, Link, Typography } from "@material-ui/core"
import React, { useState } from "react"
import "typeface-roboto"
import Bisect from "./Bisect"
import SetupForm from "./SetupForm"

export default function App() {
  const [candidates, setCandidates] = useState<string[]>()

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1">
        Bisect
      </Typography>
      <Typography gutterBottom>
        An interactive GUI for binary searches. Inspired by{" "}
        <Link href="https://git-scm.com/docs/git-bisect">
          <code>git bisect</code>
        </Link>
        .
      </Typography>

      {candidates ? (
        <Bisect
          candidates={candidates}
          reset={() => setCandidates(undefined)}
        />
      ) : (
        <SetupForm onSubmit={setCandidates} />
      )}
    </Container>
  )
}
