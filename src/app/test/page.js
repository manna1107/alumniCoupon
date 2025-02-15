'use client';
import { useState } from "react";
import { Grid, TextField } from "@mui/material";

// ฟังก์ชันแปลง datetime เป็น ISO 8601 ("YYYY-MM-DDTHH:mm:ss.sssZ")
const formatToISOString = (datetime) => {
  if (!datetime) return "";
  return new Date(datetime).toISOString();
};

export default function CouponForm() {
  const [formData, setFormData] = useState({
    start_Date: "",
    end_Date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: formatToISOString(value), // แปลงเป็น ISO 8601 ก่อนเก็บลง state
    });
  };

  return (
    <Grid container spacing={2}>
      {/* Start DateTime */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="datetime-local"
          label="ระยะเวลาการใช้คูปอง (จาก)"
          name="start_Date"
          value={formData.start_Date ? formData.start_Date.slice(0, 16) : ""} // แสดงเป็น YYYY-MM-DDTHH:mm
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      
      {/* End DateTime */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="datetime-local"
          label="ถึง"
          name="end_Date"
          value={formData.end_Date ? formData.end_Date.slice(0, 16) : ""}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* แสดงผลวันที่ในรูปแบบ ISO 8601 */}
      <Grid item xs={12}>
        <p>📅 Start Date: {formData.start_Date || "-"}</p>
        <p>📅 End Date: {formData.end_Date || "-"}</p>
      </Grid>
    </Grid>
  );
}
