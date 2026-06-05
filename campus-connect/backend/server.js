const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1', user: 'root', password: 'root', database: 'campus_db'
});

db.connect(err => {
    if (err) console.error('❌ DB ERROR:', err.message);
    else console.log('✅ Connected to MySQL: campus_db');
});

// 1. Fetch All
app.get('/api/appointments/all', (req, res) => {
    const sql = `SELECT id, student_name AS studentName, faculty_name AS facultyName,
                 community_name AS communityName, room_no AS roomNo,
                 appointment_time AS appointmentTime, reason, status FROM appointments ORDER BY id DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Update Status + Reward (With deep logging)
app.patch('/api/appointments/:id/status', (req, res) => {
    const appointmentId = req.params.id;
    const status = req.query.status || req.body.status;
    const reward = (status === 'APPROVED') ? 10 : 0;

    console.log(`\n--- Update Attempt ---`);
    console.log(`ID: ${appointmentId} | New Status: ${status} | Reward: ${reward}`);

    const sql = "UPDATE appointments SET status = ?, impact_score_reward = ? WHERE id = ?";

    db.query(sql, [status, reward, appointmentId], (err, result) => {
        if (err) {
            console.error('❌ MYSQL ERROR:', err.message);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            console.warn('⚠️ No rows updated. Does the ID exist?');
            return res.status(404).json({ error: "Appointment ID not found" });
        }

        console.log('✅ Update Successful!');
        res.json({ success: true, message: `Status: ${status}, Reward: ${reward}` });
    });
});

// 3. Delete
app.delete('/api/appointments/:id', (req, res) => {
    db.query("DELETE FROM appointments WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted!" });
    });
});

app.listen(8080, '0.0.0.0', () => console.log("🚀 Server: http://127.0.0.1:8080"));