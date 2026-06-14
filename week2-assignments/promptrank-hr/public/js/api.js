/**
 * api.js — Fetch wrapper for PromptRank HR backend
 *
 * In production (Vercel), the API is on the same domain: /api/employees
 * In local dev (node api/index.js), the API is on http://localhost:5000
 *
 * We auto-detect which one to use based on the hostname.
 */

const BASE_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '';

const API = {
  /** Fetch all employees */
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/api/employees`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  },

  /** Create a new employee */
  create: async (data) => {
    const res = await fetch(`${BASE_URL}/api/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create employee');
    return json;
  },

  /** Update an existing employee by id */
  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update employee');
    return json;
  },

  /** Delete an employee by id */
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/api/employees/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to delete employee');
    return json;
  },
};
