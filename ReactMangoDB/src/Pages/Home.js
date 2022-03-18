import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getDayDiff } from '../utils';

/**
 * Homage (bug list) page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Home () {
  // bug list
  const [bugs, setBugs] = useState([]);
  // is loading or not
  const [loading, setLoading] = useState(true);
  // now's time
  const [now] = useState(new Date());

  useEffect(() => {
    // fetch bug list on mounted
    axios.get('/api/bug')
      .then(res => {
        // success
        setBugs(res.data);
        setLoading(false);
      });
  }, []);

  return (<>
    <h1>Bug List</h1>
    <br/>
    {bugs.length === 0 ? <p className={'alert alert-info'}>{loading ? 'Loading...' : 'No bugs yet. Try to create one.'}</p> : <div
      className={'table-responsive'}>
      <table
        className={'table table-hover'}
        cellSpacing={0}
        cellPadding={0}>
        <thead>
        <tr>
          <th>Title</th>
          <th>Created At</th>
          <th>Days left to fix</th>
          <th>Assignee</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {bugs.map(v => {
          // how many days to due
          const dueDiff = 1000 * 60 * 60 * 24 * v.DueAfterDays;
          // the creation date
          const createDate = new Date(`${v.Date} ${v.Time}`);
          // the actual due day
          const dueDate = new Date(createDate.getTime() + dueDiff);
          // days left before due
          const daysLeft = getDayDiff(dueDate, now);

          return (<tr key={v._id} className={daysLeft < 0 ? 'table-danger' : ''}>
            <td><Link to={'/view/' + v._id}>{v.Title}</Link></td>
            <td>{v.Date} {v.Time}</td>
            <td>{daysLeft < 0 ? 'Out of date!' : daysLeft.toFixed(1)}</td>
            <td>{v.Assignee.Name}</td>
            <td>
              <Link to={'/view/' + v._id}>View Detail</Link>
              &nbsp;
              &nbsp;
              <Link to={'/bug/' + v._id}>Edit</Link>
            </td>
          </tr>);
        })}
        </tbody>
      </table>
    </div>}

  </>);
}