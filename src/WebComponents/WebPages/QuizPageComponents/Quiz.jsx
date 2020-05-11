import React, { Component, Fragment } from 'react'
import { Button, Icon, Header, Message } from "semantic-ui-react"
import { navigate } from "gatsby"

import correctNotification from '../../../assets/audio/correct-answer.mp3'
import wrongNotification from '../../../assets/audio/wrong-answer.mp3'
import quitButton from '../../../assets/audio/quit-button.mp3'
import nextButton from '../../../assets/audio/next-button.mp3'
import questions from '../../../../questions.json'
import isEmpty from '../../../utils/is-empty'

import './styles.css'

class Quiz extends Component {
  state = {
    questions,
    currentQuestion: {},
    nextQuestion: {},
    answer: '',
    numberOfQuestions: 0,
    numberOfAnsweredQuestions: 0,
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    previousRandomNumbers: [],
    time: {},
    showSuccessMessage: false,
    showErrorMessage: false
  }
  interval = null
  correctSound = React.createRef()
  wrongSound = React.createRef()
  quitSound = React.createRef()
  nextSound = React.createRef()

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion } = this.state
    this.displayQuestions(questions, currentQuestion, nextQuestion)
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion) => {
    let { currentQuestionIndex } = this.state
    if (!isEmpty(questions)) {
      questions = this.state.questions
      currentQuestion = questions[currentQuestionIndex]
      nextQuestion = questions[currentQuestionIndex + 1]
      const answer = currentQuestion.answer
      this.setState({
        currentQuestion,
        nextQuestion,
        numberOfQuestions: questions.length,
        answer,
        previousRandomNumbers: []
      }
      )
    }
  }

  handleClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        this.correctSound.current.play()
      }, 100)
      this.correctAnswer()
    } else {
      setTimeout(() => {
        this.wrongSound.current.play()
      }, 100)
      this.wrongAnswer()
    }
  }

  handleNextButtonClick = () => {
    const { questions, currentQuestion, nextQuestion } = this.state
    this.playNextButtonSound()
    if (nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
        this.displayQuestions(questions, currentQuestion, nextQuestion)
      })
    } else {
      this.endGame()
    }
  }

  handleQuitButtonClick = (e) => {
    this.playQuitButtonSound()
    this.endGame()
  }

  playNextButtonSound = () => {
    this.nextSound.current.play()
  }

  playQuitButtonSound = () => {
    this.quitSound.current.play()
  }

  showSuccessMessage = () => {
    this.setState({
      showSuccessMessage: true
    })
    setTimeout(() => {
      this.setState({
        showSuccessMessage: false
      })
    }, 500)
  }
  showErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    })
    setTimeout(() => {
      this.setState({
        showErrorMessage: false
      })
    }, 500)
  }

  correctAnswer = () => {
    const { questions, currentQuestion, nextQuestion } = this.state
    this.showSuccessMessage()
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      if (nextQuestion === undefined) {
        this.endGame()
      } else {
        this.displayQuestions(questions, currentQuestion, nextQuestion)
      }
    })
  }

  wrongAnswer = () => {
    const { questions, currentQuestion, nextQuestion } = this.state
    navigator.vibrate(100)
    this.showErrorMessage()
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      if (nextQuestion === undefined) {
        this.endGame()
      } else {
        this.displayQuestions(questions, currentQuestion, nextQuestion)
      }
    })
  }

  startTimer = () => {
    const countDownTime = Date.now() + 180000
    this.interval = setInterval(() => {
      const now = new Date()
      const distance = countDownTime - now
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      if (distance < 0) {
        clearInterval(this.interval)
        this.setState({
          time: {
            minutes: 0,
            seconds: 0
          }
        }, () => {
          this.endGame()
        })
      } else {
        this.setState({
          time: {
            seconds,
            minutes,
            distance
          }
        })
      }
    }, 1000)
  }

  endGame = () => {
    const {
      score,
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers
    } = this.state
    const playerStats = {
      score,
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers
    }
    setTimeout(() => {
      navigate('/result', { state: { playerStats } })
    }, 100)
  }

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions,
      time,
      showSuccessMessage,
      showErrorMessage,
    } = this.state

    return (<div>
      <Fragment>
        <audio ref={this.correctSound} src={correctNotification}></audio>
        <audio ref={this.wrongSound} src={wrongNotification}></audio>
        <audio ref={this.quitSound} src={quitButton}></audio>
        <audio ref={this.nextSound} src={nextButton}></audio>
      </Fragment>
      {showSuccessMessage ?
        <Message compact size='small' color='green' style={{ float: 'right' }}>
          <Message.Header>CORRECT !!</Message.Header>
        </Message> :
        <Message hidden />
      }
      {showErrorMessage ?
        <Message compact size='small' color='red' style={{ float: 'right' }}>
          <Message.Header>WRONG !!</Message.Header>
        </Message> :
        <Message hidden />
      }
      <div className='questions'>
        <div className='timer-container'>
          <p>
            <span className='left'>
              {(currentQuestionIndex < numberOfQuestions) ?
                currentQuestionIndex + 1 :
                currentQuestionIndex} of {numberOfQuestions}
            </span>
            <span className='right'>
              {time.minutes}:{time.seconds}{time.distance > 30000 ?
                <Icon className='clock' name='clock outline' /> :
                <Icon className='clock-warn' name='clock outline' />
              }
            </span>
          </p>
        </div>
        <Header as='h2' textAlign='center'>{currentQuestion.question}</Header>
        <div className='options-container'>
          <div className='option-style'>
            <Button onClick={this.handleClick} className='option' fluid primary size='large'
              content={currentQuestion.optionA} />
          </div>
          <div className='option-style'>
            <Button onClick={this.handleClick} className='option' fluid primary size='large'
              content={currentQuestion.optionB} />
          </div>
          <div className='option-style'>
            <Button onClick={this.handleClick} className='option' fluid primary size='large'
              content={currentQuestion.optionC} />
          </div>
          <div className='option-style'>
            <Button onClick={this.handleClick} className='option' fluid primary size='large'
              content={currentQuestion.optionD} />
          </div>
        </div>
        <div className='button-container'>
          <Button onClick={this.handleNextButtonClick} positive>Skip &#8250;</Button>
          <Button onClick={this.handleQuitButtonClick} negative>Quit ×</Button>
        </div>
      </div>
    </div>)
  }
}

export default Quiz