import React from "react"
import { Container } from "semantic-ui-react"
import HomePageLayout from "../WebComponents/Layouts/HomePageLayout"
import Result from "../WebComponents/WebPages/QuizPageComponents/Result"

const globalStyle = {
  backgroundColor: "#ffffff",
}

export default () => (
  <div style={globalStyle}>
    <Container style={globalStyle}>
      <HomePageLayout>
        <Result />
      </HomePageLayout>
    </Container>
  </div>
)
