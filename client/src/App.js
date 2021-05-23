import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles.css'
import QuestionsNAnswers from './components/pages/QuestionsNAnswers'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import QuestionState from './context/question/queState'
import AnswerState from './context/answer/answerState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <QuestionState>
        <AnswerState>
          <AlertState>
            <Router>
              <Fragment>
                <Alerts />
                <Switch>
                  <Route exact path='/' component={QuestionsNAnswers} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </Fragment>
            </Router>
          </AlertState>
        </AnswerState>
      </QuestionState>
    </AuthState>
  )
}

export default App
