import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/modal';
import Navigation from './Navigation';

const ListJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    getJobs();
  }, [page, keyword]);

  const getJobs = async () => {
    const response = await axios.get(
      `http://localhost:8000/jobs?description=${keyword}&page=${page}&limit=${limit}`,
      {
        'content-type': 'multipart/form-data',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setJobs(response.data.data);
    setPage(response.data.pagination.page);
    setPages(response.data.pagination.totalPage);
    setRows(response.data.pagination.totalRows);
    console.log(response);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <div className="container">
      <Navigation />
      {token && (
        <div className="col-md-4 mt-4 mb-4">
          <Link to={`/add`} className="button btn btn-success">
            Add Product
          </Link>
        </div>
      )}

      <div className="row">
        <form onSubmit={searchData}>
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find something"
                id=""
              />
            </div>

            <div className="control">
              <button type="submit" className="btn btn-info">
                Search
              </button>
            </div>
          </div>
        </form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Company</th>
              <th>Type</th>
              <th>Location</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/jobs/${job.id}`}>{job.title}</a>
                </td>
                <td>{job.company}</td>
                <td>{job.type}</td>
                <td>{job.location}</td>
                <td>{job.created_at}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>
          Total Data: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>

        <nav
          className="pagination is-centered"
          key={rows}
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            previousLabel={'< Prev'}
            nextLabel={'Next >'}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName={'pagination-list'}
            pageLinkClassName={'pagination-link'}
            previousLinkClassName={'pagination-previous'}
            nextLinkClassName={'pagination-next'}
            activeClassName={'pagination-link is-current'}
            disabledLinkClassName={'pagination-link is-disabled'}
          />
        </nav>
      </div>
    </div>
  );
};

export default ListJobs;
