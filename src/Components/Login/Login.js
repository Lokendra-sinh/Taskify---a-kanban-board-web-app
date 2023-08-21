import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Login.scss';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, where, query, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useBoardsContext } from '../../BoardsContext';
import { useUserContext } from '../../userContext';
import { ACTION_TYPES } from '../../userReducerTypes';

const Login = () => {

  const {state, dispatch} = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
 const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();
  console.log("inside handle log in");
  try {
    console.log("inside handle log in try block");
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
 const user = userCredentials.user;
console.log("user logged in: ", user.email);
const userRef = doc(db, "Users", user.uid);
const userSnapShot = await getDoc(userRef);

console.log("userSnapShot: ", userSnapShot);
console.log("userSnapShot exists: ", userSnapShot.exists());
console.log("userSnapShot data: ", userSnapShot.data());
if(userSnapShot.exists()) {
  dispatch({type: ACTION_TYPES.SET_USER_CREDENTIALS, payload: {
    name: userSnapShot.data().Name,
    email: userSnapShot.data().Email,
    userId: userSnapShot.data().UserId,
    boards: userSnapShot.data().boards,
  }})
  console.log("board id is: ", userSnapShot.data().boards[0]);
  console.log("user logged in value from login component: ", state.userLoggedIn);
  // navigate(`/board/1`);
} else {
console.log("error while fetching user data from firestore");
}
  } catch(error){
    setError(true);
  };
}

useEffect(() => {
  console.log("user logged in value from login hook: ", state.userLoggedIn)
  if(state.userLoggedIn) {
    navigate(`/board/1`);
  }
},[state.userLoggedIn])

  return (
    <div className='login'>
      <span>TASKiFY</span>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>Email</label>
        <input type='email' placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}  />
        <label>Password</label>
        <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>
        {error && <span>Wrong username or password!</span>}
        <div>
          <span>Don't have an account?</span>
          <button onClick={()=>navigate('/register')}>Register</button>
        </div>
       
      </form>
    </div>
  );
};

export default Login;
