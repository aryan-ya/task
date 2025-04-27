// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async (page = 1) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`);
    setUsers(response.data);
    setTotalUsers(100);  // Assume 100 total users (JSONPlaceholder doesn't provide total count)
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Only 2 pages in total (hardcoded for your requirement)
  const totalPages = 2;

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Always display pages 1 and 2
  const pagesToShow = [1, 2];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Dashboard</h2>

      {/* Centered Search Input */}
      <div className="d-flex justify-content-center mb-3">
        <div className="col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="row">
        {filteredUsers.map(user => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Phone: {user.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {pagesToShow.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => changePage(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
