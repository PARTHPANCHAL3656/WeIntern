/**
 * app.js — PromptRank HR UI logic
 *
 * State:
 *   allEmployees  — full list from API (source of truth)
 *   editingId     — MongoDB _id of employee being edited, or null
 *   deleteId      — MongoDB _id of employee queued for deletion
 */

// ── State ──────────────────────────────────────────────────────────────────
let allEmployees = [];
let editingId    = null;
let deleteId     = null;

// ── DOM refs ───────────────────────────────────────────────────────────────
const searchInput     = document.getElementById('searchInput');
const addBtn          = document.getElementById('addBtn');
const statsCount      = document.getElementById('statsCount');

const loadingState    = document.getElementById('loadingState');
const emptyState      = document.getElementById('emptyState');
const noResultsState  = document.getElementById('noResultsState');
const empTable        = document.getElementById('empTable');
const empTableBody    = document.getElementById('empTableBody');
const empCards        = document.getElementById('empCards');

// Form modal
const formOverlay     = document.getElementById('formOverlay');
const formModalTitle  = document.getElementById('formModalTitle');
const empForm         = document.getElementById('empForm');
const formCloseBtn    = document.getElementById('formCloseBtn');
const formCancelBtn   = document.getElementById('formCancelBtn');
const formSubmitBtn   = document.getElementById('formSubmitBtn');
const fieldName       = document.getElementById('fieldName');
const fieldDept       = document.getElementById('fieldDept');
const fieldRole       = document.getElementById('fieldRole');
const fieldSalary     = document.getElementById('fieldSalary');
const fieldJoinDate   = document.getElementById('fieldJoinDate');
const errName         = document.getElementById('errName');
const errDept         = document.getElementById('errDept');
const errRole         = document.getElementById('errRole');
const errSalary       = document.getElementById('errSalary');
const errJoinDate     = document.getElementById('errJoinDate');

// Delete modal
const deleteOverlay   = document.getElementById('deleteOverlay');
const deleteEmpName   = document.getElementById('deleteEmpName');
const deleteCloseBtn  = document.getElementById('deleteCloseBtn');
const deleteCancelBtn = document.getElementById('deleteCancelBtn');
const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');

// Toast
const toast    = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
let toastTimer = null;

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  toastMsg.textContent = msg;
  toast.className = `toast toast-${type}`;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function formatSalary(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function isoDate(dateStr) {
  // Return YYYY-MM-DD from an ISO string (for pre-filling date input)
  return dateStr ? dateStr.slice(0, 10) : '';
}

// ── Render ─────────────────────────────────────────────────────────────────
function render(list) {
  // Update stat badge
  statsCount.textContent = allEmployees.length;

  // Decide which state to show
  loadingState.classList.add('hidden');

  if (allEmployees.length === 0) {
    emptyState.classList.remove('hidden');
    noResultsState.classList.add('hidden');
    empTable.classList.add('hidden');
    empCards.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  if (list.length === 0) {
    noResultsState.classList.remove('hidden');
    empTable.classList.add('hidden');
    empCards.classList.add('hidden');
    return;
  }

  noResultsState.classList.add('hidden');
  empTable.classList.remove('hidden');
  empCards.classList.remove('hidden');

  // Desktop table rows
  empTableBody.innerHTML = list.map((emp) => `
    <tr>
      <td class="td-name">${escHtml(emp.name)}</td>
      <td>${escHtml(emp.department)}</td>
      <td>${escHtml(emp.role)}</td>
      <td class="td-salary">${formatSalary(emp.salary)}</td>
      <td>${formatDate(emp.joinDate)}</td>
      <td class="td-actions">
        <button class="btn btn-edit" onclick="openEditModal('${emp._id}')">Edit</button>
        <button class="btn btn-del"  onclick="openDeleteModal('${emp._id}', '${escHtml(emp.name)}')">Delete</button>
      </td>
    </tr>
  `).join('');

  // Mobile cards
  empCards.innerHTML = list.map((emp) => `
    <div class="emp-card">
      <div class="emp-card-header">
        <div>
          <div class="emp-card-name">${escHtml(emp.name)}</div>
          <div class="emp-card-role">${escHtml(emp.role)} · ${escHtml(emp.department)}</div>
        </div>
        <div class="emp-card-actions">
          <button class="btn btn-edit" onclick="openEditModal('${emp._id}')">Edit</button>
          <button class="btn btn-del"  onclick="openDeleteModal('${emp._id}', '${escHtml(emp.name)}')">Delete</button>
        </div>
      </div>
      <div class="emp-card-meta">
        <div class="emp-card-field">
          <div class="emp-card-field-label">Salary</div>
          <div class="emp-card-field-val salary">${formatSalary(emp.salary)}</div>
        </div>
        <div class="emp-card-field">
          <div class="emp-card-field-label">Joined</div>
          <div class="emp-card-field-val">${formatDate(emp.joinDate)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Prevent XSS when injecting user data into innerHTML
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Search ─────────────────────────────────────────────────────────────────
function applySearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    render(allEmployees);
    return;
  }
  const filtered = allEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q)
  );
  render(filtered);
}

searchInput.addEventListener('input', applySearch);

// ── Fetch all employees ────────────────────────────────────────────────────
async function loadEmployees() {
  loadingState.classList.remove('hidden');
  emptyState.classList.add('hidden');
  empTable.classList.add('hidden');
  empCards.classList.add('hidden');

  try {
    allEmployees = await API.getAll();
    applySearch(); // respect any existing search term
  } catch (err) {
    loadingState.classList.add('hidden');
    showToast('Could not load employees. Is the server running?', 'error');
  }
}

// ── Form modal ─────────────────────────────────────────────────────────────
function clearFormErrors() {
  [errName, errDept, errRole, errSalary, errJoinDate].forEach((el) => (el.textContent = ''));
  [fieldName, fieldDept, fieldRole, fieldSalary, fieldJoinDate].forEach((el) =>
    el.classList.remove('input-error')
  );
}

function validateForm() {
  let valid = true;

  function fail(field, errEl, msg) {
    field.classList.add('input-error');
    errEl.textContent = msg;
    valid = false;
  }

  if (!fieldName.value.trim())   fail(fieldName,     errName,     'Name is required');
  if (!fieldDept.value.trim())   fail(fieldDept,     errDept,     'Department is required');
  if (!fieldRole.value.trim())   fail(fieldRole,     errRole,     'Role is required');
  if (!fieldJoinDate.value)      fail(fieldJoinDate, errJoinDate, 'Join date is required');

  const sal = Number(fieldSalary.value);
  if (!fieldSalary.value)        fail(fieldSalary,   errSalary,   'Salary is required');
  else if (sal <= 0)             fail(fieldSalary,   errSalary,   'Salary must be greater than 0');

  return valid;
}

function openAddModal() {
  editingId = null;
  formModalTitle.textContent = 'Add Employee';
  formSubmitBtn.textContent  = 'Save Employee';
  empForm.reset();
  clearFormErrors();
  formOverlay.classList.remove('hidden');
  fieldName.focus();
}

function openEditModal(id) {
  const emp = allEmployees.find((e) => e._id === id);
  if (!emp) return;

  editingId = id;
  formModalTitle.textContent = 'Edit Employee';
  formSubmitBtn.textContent  = 'Update Employee';

  fieldName.value     = emp.name;
  fieldDept.value     = emp.department;
  fieldRole.value     = emp.role;
  fieldSalary.value   = emp.salary;
  fieldJoinDate.value = isoDate(emp.joinDate);

  clearFormErrors();
  formOverlay.classList.remove('hidden');
  fieldName.focus();
}

function closeFormModal() {
  formOverlay.classList.add('hidden');
  editingId = null;
}

addBtn.addEventListener('click', openAddModal);
formCloseBtn.addEventListener('click', closeFormModal);
formCancelBtn.addEventListener('click', closeFormModal);

// Close modal on backdrop click
formOverlay.addEventListener('click', (e) => {
  if (e.target === formOverlay) closeFormModal();
});

// Form submit — create or update
empForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFormErrors();
  if (!validateForm()) return;

  const data = {
    name:       fieldName.value.trim(),
    department: fieldDept.value.trim(),
    role:       fieldRole.value.trim(),
    salary:     Number(fieldSalary.value),
    joinDate:   fieldJoinDate.value,
  };

  formSubmitBtn.disabled = true;
  formSubmitBtn.textContent = 'Saving…';

  try {
    if (editingId) {
      await API.update(editingId, data);
      showToast(`${data.name} updated successfully`);
    } else {
      await API.create(data);
      showToast(`${data.name} added successfully`);
    }
    closeFormModal();
    await loadEmployees();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = editingId ? 'Update Employee' : 'Save Employee';
  }
});

// ── Delete modal ───────────────────────────────────────────────────────────
function openDeleteModal(id, name) {
  deleteId = id;
  deleteEmpName.textContent = name;
  deleteOverlay.classList.remove('hidden');
}

function closeDeleteModal() {
  deleteOverlay.classList.add('hidden');
  deleteId = null;
}

deleteCloseBtn.addEventListener('click', closeDeleteModal);
deleteCancelBtn.addEventListener('click', closeDeleteModal);
deleteOverlay.addEventListener('click', (e) => {
  if (e.target === deleteOverlay) closeDeleteModal();
});

deleteConfirmBtn.addEventListener('click', async () => {
  if (!deleteId) return;

  deleteConfirmBtn.disabled = true;
  deleteConfirmBtn.textContent = 'Deleting…';

  try {
    await API.delete(deleteId);
    showToast('Employee deleted');
    closeDeleteModal();
    await loadEmployees();
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    deleteConfirmBtn.disabled = false;
    deleteConfirmBtn.textContent = 'Delete';
  }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!formOverlay.classList.contains('hidden'))   closeFormModal();
    if (!deleteOverlay.classList.contains('hidden')) closeDeleteModal();
  }
});

// ── Init ───────────────────────────────────────────────────────────────────
loadEmployees();
