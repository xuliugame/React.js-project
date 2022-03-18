import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const defaultItem = {
  Title: '',
  Description: '',
  Time: '',
  Date: '',
  Assignee: '',
  DueAfterDays: 3,
};

/**
 * Create/edit bug page
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddBug () {
  // the id to edit
  const { id } = useParams();
  // add/edit success or not
  const [status, setStatus] = useState(null);
  // loading or not
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const time = new Date();

  // bug data, with date/time init to current time
  const [item, setItem] = useState({
    ...defaultItem,
    Date: `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`,
    Time: `${time.getHours()}:${time.getMinutes()}`
  });

  // users list
  const [users, setUsers] = useState([]);

  // if no id is present, it is add mode
  const isEdit = !!id;

  useEffect(() => {
    // load users list on mounted
    axios.get('/api/user').then(res => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (!id) {
      // is add mode
      setLoading(false);
      return;
    }
    // is edit mode, fetch exist bug data to edit
    setLoading(true);
    axios.get('/api/bug/' + id).then(res => {
      // fetch success
      setItem(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    // return loading text
    return <p>Loading...</p>;
  }

  return (
    <form
      action={'/api/data'}
      method={'post'}
      onSubmit={e => {
        // on form submit, prevent page from reload
        e.preventDefault();
        if (isEdit) {
          // is creation
          axios.put('/api/bug/' + id, item)
            .then(() => {
              // success
              setStatus(true);
            })
            .catch(err => {
              // fail
              setStatus(false);

            });
        } else {
          // is creation
          axios.post('/api/bug', item)
            .then(() => {
              // success
              setStatus(true);
            })
            .catch(err => {
              // fail
              setStatus(false);
            });
        }
      }}>
      <h2>{isEdit ? 'Edit bug' : 'Create new bug'}</h2>
      <div className={'mb-3'}>
        <label>Title</label>
        <input required={true} value={item.Title} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, Title: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Description</label>
        <textarea value={item.Description} required={true} className={'form-control'}
                  onInput={e => setItem(prevState => ({ ...prevState, Description: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Date</label>
        <input value={item.Date} required={true} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, Date: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Time</label>
        <input value={item.Time} required={true} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, Time: e.target.value }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Due After Days</label>
        <input value={item.DueAfterDays} required={true} type={'number'} step={1} className={'form-control'}
               onInput={e => setItem(prevState => ({ ...prevState, DueAfterDays: Number(e.target.value) }))}/>
      </div>
      <div className={'mb-3'}>
        <label>Assignee</label>
        <select value={item.Assignee?._id || item.Assignee} required={true} className={'form-control'}
                onChange={e => setItem(prevState => ({ ...prevState, Assignee: e.target.value }))}>
          <option value={''}>select...</option>
          {
            users.map(v => (
              <option value={v._id} key={v._id}>{v.Name}</option>
            ))
          }
        </select>
        <br/>
        <small>No users yet? <Link to={'/user'}>Create one!</Link></small>
      </div>

      <div className={'mb-3'}>
        {
          isEdit ? <>
            <button className={'btn btn-primary'}>Update</button>
            <button type={'button'} className={'btn btn-danger mx-2'} onClick={() => {
              if (window.confirm('Are you sure to delete this bug?')) {
                // delete bug
                axios.delete('/api/bug/' + id)
                  .then(res => {
                    // success
                    window.alert('Bug deleted!');
                    navigate('/');
                  });
              }
            }
            }>Delete
            </button>
          </> : <>
            <button className={'btn btn-primary'}>Create</button>
          </>
        }
      </div>


      {
        status === true && <div className={'alert alert-success'}>
          {isEdit ? 'Update' : 'Add'} bug success! <Link to={'/'}>back to homepage</Link>
        </div>
      }
      {
        status === false && <div className={'alert alert-error'}>
          {isEdit ? 'Update' : 'Add'} bug failed! <Link to={'/'}>back to homepage</Link>
        </div>
      }
    </form>
  );
}