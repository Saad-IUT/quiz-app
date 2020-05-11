import React from "react"
import { Container } from "semantic-ui-react"
import HomePageLayout from "../WebComponents/Layouts/HomePageLayout"
import Quiz from "../WebComponents/WebPages/QuizPageComponents/Quiz"

const globalStyle = {
  backgroundColor: "#ffffff",
}

export default () => (
  <div style={globalStyle}>
    <Container style={globalStyle}>
      <HomePageLayout>
        <Quiz />
      </HomePageLayout>
    </Container>
  </div>
)
