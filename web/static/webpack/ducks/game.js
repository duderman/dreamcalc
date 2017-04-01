import { Map } from 'immutable'

function rand (min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const OPERATIONS = ['+', '-', '*', '/']

function calculate (a, b, op) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return a / b
  }
}

function generateQuestion (last = false) {
  const firstNumber = rand()
  const secondNumber = rand()
  const operation = OPERATIONS[rand(0, 3)]
  const answer = calculate(firstNumber, secondNumber, operation)
  return Map({ firstNumber, secondNumber, operation, answer, last, startedAt: now() })
}

const now = () => new Date()

function storeResponseTime (state) {
  const times = state.get('responseTimes')
  const currentStartedAt = state.getIn(['currentQuestion', 'startedAt'])
  const timeDiff = now() - currentStartedAt
  return state.set('responseTimes', times.push(timeDiff))
}

const MAX_QUESTIONS = 2

const isEnough = state => state.get('responseTimes').size >= MAX_QUESTIONS
const isLast = state => state.get('responseTimes').size === MAX_QUESTIONS - 1

const initialState = Map({ started: false, finished: false, responseTimes: [], currentQuestion: null })

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return currentState.merge({ started: true, finished: false, currentQuestion: generateQuestion(), responseTimes: [] })
    case NEXT_QUESTION:
      const stateWithTime = storeResponseTime(currentState)
      if (isEnough(stateWithTime)) {
        return stateWithTime.merge({ started: false, finished: true, currentQuestion: null })
      } else {
        const last = isLast(currentState)
        return stateWithTime.set('currentQuestion', generateQuestion(last))
      }
    default:
      return currentState
  }
}

export const startGame = () => ({ type: START_GAME })
export const next = () => ({ type: NEXT_QUESTION })

const START_GAME = 'START_GAME'
const NEXT_QUESTION = 'NEXT_QUESTION'
