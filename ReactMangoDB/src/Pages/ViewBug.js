import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getDayDiff } from '../utils';

/**
 * View bug details page
 * @returns {JSX.Element}
 * @constructor
 */
export default function ViewBug () {
  // id to view
  const { id } = useParams();
  // loading or not
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // form note value
  const [note, setNote] = useState('');

  const now = new Date();

  // bug data to view
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) {
      // no id provided, back to homepage
      navigate('/');
      return;
    }
    // fetch bug data
    setLoading(true);
    axios.get('/api/bug/' + id).then(res => {
      // success
      setItem(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    // return loading text
    return <p>Loading...</p>;
  }

  // how many days to due
  const dueDiff = 1000 * 60 * 60 * 24 * item.DueAfterDays;
  // the creation date
  const createDate = new Date(`${item.Date} ${item.Time}`);
  // the actual due day
  const dueDate = new Date(createDate.getTime() + dueDiff);
  // days left before due
  const daysLeft = getDayDiff(dueDate, now);

  return (
    <div className={'detail'}>
      <div>Bug #{item._id}</div>
      <h2>{item.Title}</h2>
      <pre>{item.Description}</pre>
      <p>Created at {item.Date} {item.Time}, Due after {item.DueAfterDays} day(s)</p>
      <p>Created By {item.Assignee.Name}</p>

      <p>Due status: {daysLeft < 0 ? <span
        className={'due'}>Out of date!</span> : daysLeft.toFixed(1) + ' days left'}</p>
      <h2>Notes</h2>

      <ol>
        {
          item.Notes.map((v, index) => <li key={index}>{v}</li>)
        }
      </ol>

      <form onSubmit={event => {
        // on form submit, prevent page from reload
        event.preventDefault();
        // append new note to bug notes
        const newBug = {
          ...item,
          Notes: [...item.Notes, note]
        };
        // update note
        axios.put('/api/bug/' + id, newBug).then(() => {
          // success
          setItem(newBug);
          setNote('');
        });
      }}>
        <div className={'mb-3'}>
          <textarea required value={note} placeholder={'Say something'} onInput={e => setNote(e.target.value)}
                    className={'form-control'}/>
        </div>
        <button type={'submit'} className={'btn btn-primary'}>Add note</button>
      </form>
    </div>
  );
}