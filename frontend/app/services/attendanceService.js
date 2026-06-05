export const markAttendance = async (lat, lon, studentName) => {
  try {
    const response = await fetch('http://localhost:8080/api/attendance/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: studentName,
        latitude: lat,
        longitude: lon
      }),
    });

    const data = await response.json();
    return data; // This returns the "Presence Established!" message
  } catch (error) {
    console.error("Vortex Connection Error:", error);
    return { success: false, message: "Server is offline" };
  }
};