import React, { useState } from 'react';
import ImageIcon from '@material-ui/icons/Image';
// import PersonIcon from '@material-ui/icons/Person';

function Profile() {

  const [img, setimg] = useState('')
  const getImage = e => {
    if (e.target.files[0])
      setimg(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='profilePage'>
      <svg viewBox='0 0 500 200' className='wavyBG'>
        <path d='M0, 100 C150, 200 350, 0 500, 100 L500, 00 L0, 0 Z' fill='#1b1b2f'></path>
      </svg>
      <div className='ProfileHeader' >
        <form>
          <label className='imageInput'>
            <input type="file" accept='image/*' id='Image' onChange={getImage} />
            <ImageIcon className='imgIcon' />
            <img className='profileImage' id='imgShow' src={img} alt='Your profileImage'></img>
          </label>
        </form>
        <span>UserName</span>
      </div>
    </div>
  )
}

export default Profile;