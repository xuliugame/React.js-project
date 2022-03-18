import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const defaultItem = {
  Name: '',
  Password: '',
  Email: '',
  Admin: false
};

/**
 * Create user page
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddUser () {
  // user data to edit
  const [item, setItem] = useState({ ...defaultItem });
  // success or not
  const [status, setStatus] = useState(null);

  return (
    <form
      action={'/api/data'}
      method={'post'}
      onSubmit={e => {
        e.preventDefault();
        // is creation
        axios.post('/api/user', item)
          .then(() => {
            // add user success
            setItem({ ...defaultItem });
            setStatus(true);
          })
          .catch(err => {
            // fail
            setStatus(false);
          });
      }}>
      <h2>Create new user</h2>
      <div className={'mb-3'}>
        <label>Name</label>
        <input required={true} value={item.Name} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, Name: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Password</label>
        <input value={item.Password} type={'password'} required={true} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, Password: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Email</label>
        <input value={item.Email} type={'email'} required={true} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, Email: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" checked={item.Admin}
                 onChange={e => setItem(prevState => ({ ...prevState, Admin: e.target.checked }))}
                 id="flexCheckDefault"/>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Admin
          </label>
        </div>
      </div>

      <div className={'mb-3'}>
        <button className={'btn btn-primary'}>Submit</button>
      </div>

      {
        status === true && <div className={'alert alert-success'}>
          Add user success! <Link to={'/'}>back to homepage</Link>
        </div>
      }
      {
        status === false && <div className={'alert alert-error'}>
          Add user failed! <Link to={'/'}>back to homepage</Link>
        </div>
      }
    </form>
  );
}