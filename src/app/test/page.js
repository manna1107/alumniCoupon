'use client';
import { useState } from "react";
import { Grid, TextField, Button, Box, Container } from "@mui/material";

// ฟังก์ชันแปลง datetime เป็น ISO 8601 ("YYYY-MM-DDTHH:mm:ss.sssZ")
const formatToISOString = (datetime) => {
  if (!datetime) return "";
  return new Date(datetime).toISOString();
};

export default function CouponForm() {
  const maxClicks = 3; // กำหนดจำนวนครั้งที่กดได้
  const [clickCount, setClickCount] = useState(0);
  const [formData, setFormData] = useState({
    start_Date: "",
    end_Date: "",
  });

  const handleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount(clickCount + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: formatToISOString(value),
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // ✅ ทำให้เต็มหน้าจอ
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3E84C9", // ✅ เปลี่ยนเป็นสีที่ต้องการ
        padding: 3,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="ระยะเวลาการใช้คูปอง (จาก)"
                name="start_Date"
                value={formData.start_Date ? formData.start_Date.slice(0, 16) : ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

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

            <Grid item xs={12}>
              <p>📅 Start Date: {formData.start_Date || "-"}</p>
              <p>📅 End Date: {formData.end_Date || "-"}</p>
            </Grid>

            <Button
              variant="contained"
              color={clickCount >= maxClicks ? "inherit" : "primary"}
              onClick={handleClick}
              disabled={clickCount >= maxClicks}
            >
              {clickCount >= maxClicks ? "หมดสิทธิ์กด" : `กดได้อีก ${maxClicks - clickCount} ครั้ง`}
            </Button>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

