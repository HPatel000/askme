import React, { useContext, useState, Fragment } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import PropTypes from 'prop-types'
import AnswerContext from '../../context/answer/answerContext'
import AuthContext from '../../context/auth/authContext'

const AnswerItem = ({ answer }) => {
  const { ans, _id } = answer

  const answerContext = useContext(AnswerContext)
  const { deleteAnswer, setCurrent, clearCurrent, updateAnswer } = answerContext

  const authContext = useContext(AuthContext)
  const { user, updateUser } = authContext

  const [like, setLike] = useState(
    user && user.likedAnswers.includes(_id) ? 'toggleLike' : 'toggleUnlike'
  )

  let [lCount, setLCount] = useState(answer.likeCount)

  const onDelete = () => {
    deleteAnswer(_id, answer.question)
    clearCurrent()
  }

  const onlike = () => {
    if (like === 'toggleLike') {
      answer.likeCount = answer.likeCount - 1
      user.likedAnswers = user.likedAnswers.filter(answer => answer !== _id)
      setLike('toggleUnlike')
      setLCount(lCount - 1)
    } else {
      answer.likeCount = answer.likeCount + 1
      user.likedAnswers = [...user.likedAnswers, _id]
      setLike('toggleLike')
      setLCount(lCount + 1)
    }
    updateUser(user)
    updateAnswer(answer)
  }

  return (
    <div className='answer'>
      <p>{ans}</p>
      {user && user._id === answer.user ? (
        <Fragment>
          <button className='floatRight' onClick={onDelete}>
            <DeleteIcon />
          </button>
          <button className='floatRight' onClick={() => setCurrent(answer)}>
            <EditIcon />
          </button>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      {user ? (
        <button className='floatLeft' onClick={onlike}>
          {like === 'toggleLike' ? (
            <ThumbUpIcon className={like} />
          ) : (
            <ThumbUpAltOutlinedIcon className={like} />
          )}
          {lCount}
        </button>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  )
}

AnswerItem.propTypes = {
  answer: PropTypes.object.isRequired,
}

export default AnswerItem
