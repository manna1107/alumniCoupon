"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, TextField, Button, Grid, Typography } from "@mui/material";
import Header from "../../header2";

export default function CouponForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name_coupon: "",
        store_name: "",
        location: "",
        address: "",
        //start_Date: "",
        //nd_Date: "",
        type: "",
        number_of_coupons: 0,
        details: "",
    });

    // ฟังก์ชันอัปเดตค่าฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "number_of_coupons" ? Number(value) : value // แปลงค่า number_of_coupons เป็นตัวเลข
        });
    };

    // ฟังก์ชันบันทึกข้อมูล (เพิ่มใหม่)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Submitting Data:", formData); // ตรวจสอบค่าก่อนส่ง
        
        try {
            const response = await fetch(`/api/coupon`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("เพิ่มข้อมูลคูปองสำเร็จ!");
                router.push("/admin/home");
            } else {
                const errorData = await response.json();
                alert("เกิดข้อผิดพลาด: " + errorData.message);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
        }
    };

    return (
        <div>
            <Header />
            <Box>
                <Container sx={{ mt: 16, backgroundColor: "#f5f5f5", padding: 4, borderRadius: 2 }}>
                    <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
                        เพิ่มคูปอง
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="ชื่อคูปอง"
                                    name="name_coupon"
                                    value={formData.name_coupon}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="ชื่อร้าน/กิจการ"
                                    name="store_name"
                                    value={formData.store_name}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="จังหวัด"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="ที่อยู่"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="ระยะเวลาการใช้คูปอง (จาก)"
                                    name="start_Date"
                                    value={formData.start_Date}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                
                                />
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="ถึง"
                                    name="end_Date"
                                    value={formData.end_Date}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                    
                                />
                                <TextField
                                    fullWidth
                                    label="ประเภทคูปอง"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="จำนวนคูปอง"
                                    type="number"
                                    name="number_of_coupons"
                                    value={formData.number_of_coupons}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                    InputProps={{ inputProps: { min: 1 } }} // กำหนดค่าไม่ให้เป็นค่าลบ
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="เงื่อนไขการใช้งาน"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "right" }}>
                            <Button type="submit" variant="contained" color="success" size="large">
                                บันทึก
                            </Button>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </div>
    );
}
