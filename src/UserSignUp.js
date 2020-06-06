import React, { useState } from 'react';
import useSetState from './useSetState';

const initialState = {
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  investmentInterest: false,
}
const UserSignup = () => {
  const [state, setState] = useSetState(initialState);
  /*
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [investmentInterest, setInvestmentInterest] = useState(false);
  */

  const handleSubmit = event => {
    event.preventDefault();
    console.log(state);
    clear();
  };

  const clear = () => {
    setState(initialState);
    /*
    setUserName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setInvestmentInterest(false);
    */
  };

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value })
  }

  const { userName, email, password, passwordConfirmation, investmentInterest } = state;

  return (
    <form className="UserSignup" onSubmit={handleSubmit}>
      <label htmlFor="userName">User Name</label>
      <input
        id="userName"
        name="userName"
        type="text"
        value={userName}
        required
        // onChange={event => setUserName(event.target.value)}
        onChange={handleChange}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        required
        // onChange={event => setEmail(event.target.value);}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        required
        //onChange={event => setPassword(event.target.value);}
        onChange={handleChange}
      />
      <label htmlFor="passwordConfirmation">Confirm Password</label>
      <input
        id="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        value={passwordConfirmation}
        required
        // onChange={event => setPasswordConfirmation(event.target.value);}
        onChange={handleChange}
      />
      <label htmlFor="investmentInterest" className="UserSignup--checkbox">
        <input
          id="investmentInterest"
          name="investmentInterest"
          type="checkbox"
          checked={investmentInterest}
          // onChange={event => setInvestmentInterest(event.target.checked)}
          onChange={event => setState({ investmentInterest: event.target.checked })}
        />
        Do you want to maybe help us out with an angel investment?
      </label>
      <input type="Submit" />
    </form>
  );
};

export default UserSignup;