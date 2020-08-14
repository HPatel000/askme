import React, { useState, useContext } from 'react';
import ImageIcon from '@material-ui/icons/Image';

function Profile() {

  return (
    <div>
      <div className='ProfileHeader'>
        <label className='imageInput'>
          <input placeholder="Screenshot(optional)" type="file" accept='image/*' />
          <ImageIcon />
        </label>
        <h1>UserName</h1>
        <div className='Contributions'>
          <p>Total Questions : {ques.length}</p>
          <p>Total Answers : {ques.length}</p>
        </div>
      </div>
      <div className='ProfileFlex'>
        <div className='yourQuestions'>
          <h3 className='ProfileSmallTitle'>Your Questions</h3>
          {ques.map((que, index) => {
            return (
              <Question
                key={index}
                id={index}
                content={que.content}
                onDelete={DeleteQue}
              />
            )
          })}
        </div>
        <div className='youeAnswers'>
          <h3 className='ProfileSmallTitle'>You Answered</h3>
          {ques.map((que, index) => {
            return (
              <Question
                key={index}
                id={index}
                content={que.content}
                onDelete={DeleteQue}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile;
