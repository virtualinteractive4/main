// script.js

document.addEventListener("DOMContentLoaded", () => {
    populateAttendanceTable();
});

const checkInBtn = document.getElementById('checkInBtn');
const checkOutBtn = document.getElementById('checkOutBtn');
const attendanceTableBody = document.getElementById('attendanceTableBody');

// Generate rows for each day of November 2024
function populateAttendanceTable() {
    const daysInMonth = 30;
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${String(day).padStart(2, '0')}/11/2024`;
        const row = document.createElement('tr');
        row.id = `row-${dateStr}`;
        row.innerHTML = `
            <td>${dateStr}</td>
            <td>-NA-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td><button onclick="editAttendance('${dateStr}')">Edit</button></td>
        `;
        attendanceTableBody.appendChild(row);
    }
}

// Simulate "Check In" and "Check Out" actions for today's date (06/11/2024)
checkInBtn.addEventListener('click', () => {
    const today = '06/11/2024';
    markAttendance(today, getCurrentTime(), '-');
    checkInBtn.disabled = true;
});

checkOutBtn.addEventListener('click', () => {
    const today = '06/11/2024';
    const row = document.getElementById(`row-${today}`);
    if (row) {
        row.cells[3].innerText = getCurrentTime();
        row.cells[1].innerText = 'Present';
        row.cells[4].innerText = calculateDuration(row.cells[2].innerText, row.cells[3].innerText);
    }
    checkOutBtn.disabled = true;
});

// Function to mark attendance
function markAttendance(date, checkInTime, checkOutTime) {
    const row = document.getElementById(`row-${date}`);
    if (row) {
        row.cells[1].innerText = 'Present';
        row.cells[2].innerText = checkInTime;
        row.cells[3].innerText = checkOutTime;
    }
}

// Utility function to get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// Calculate duration between check-in and check-out times
function calculateDuration(checkIn, checkOut) {
    const [inHours, inMinutes] = checkIn.split(':').map(Number);
    const [outHours, outMinutes] = checkOut.split(':').map(Number);
    const durationHours = outHours - inHours;
    const durationMinutes = outMinutes - inMinutes;
    return `${durationHours}h ${durationMinutes < 0 ? 60 + durationMinutes : durationMinutes}m`;
}

// Edit function placeholder
function editAttendance(date) {
    alert(`Edit functionality for ${date} is not implemented in this demo.`);
}
