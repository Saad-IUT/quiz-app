import React, { Component } from 'react'
import { Icon, Button } from "semantic-ui-react"
import { Link } from 'gatsby'

import './styles.css'

class Result extends Component {
  state = {}
  render() {
    const { score,
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers
    } = window.history.state.playerStats
    let stats, remark
    const perScore = score / numberOfQuestions * 100
    if (perScore <= 30) {
      remark = `You need more practice!`
    } else if (perScore > 30 && perScore <= 50) {
      remark = `Better luck next time!`
    } else if (perScore <= 70 && perScore > 50) {
      remark = `You can do better!`
    } else if (perScore >= 71 && perScore <= 84) {
      remark = `You did great!`
    } else {
      remark = `You're an absolute genius!`
    }

    if (window.history.state.playerStats !== undefined) {
      stats = (
        <div>
          <div className='check-icon'>
            <Icon size='massive' name='check circle outline' />
            <h1 className='title'>Quiz has ended</h1>
          </div>
          <div className='result-container'>
            <h1 className='remark'>{remark}</h1>
            <h1 className='score'>Your Score: {perScore.toFixed(0)}%</h1><br />
            <span className="stat-left">Total Number of Questions: </span>
            <span className="right">{numberOfQuestions}</span><br /><br />
            <span className="stat-left">Number of attempted questions: </span>
            <span className="right">{numberOfAnsweredQuestions}</span><br /><br />
            <span className="stat-left">Number of Correct Answers: </span>
            <span className="right">{correctAnswers}</span><br /><br />
            <span className="stat-left">Number of Wrong Answers: </span>
            <span className="right">{wrongAnswers}</span><br /><br />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button primary > <Link to='/' style={{ color: 'white' }}>Play Again</Link></Button>
            <Button positive > <Link to='/' style={{ color: 'white' }}>Back to Home</Link></Button>
          </div>
        </div>
      )
    } else {
      stats = (
        <div style={{ textAlign: 'center' }}>
          <h1>No stats available!</h1>
          <Button primary > <Link to='/' style={{ color: 'white' }}>Take the Quiz</Link></Button>
          <Button positive > <Link to='/' style={{ color: 'white' }}>Back to Home</Link></Button>
        </div>
      )
    }
    return (<div>{stats}</div>)
  }
}

export default Result