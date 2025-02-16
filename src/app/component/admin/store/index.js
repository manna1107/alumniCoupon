"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, TextField, Button, Grid, Typography, Card, CardContent } from "@mui/material";
import Header from "../../header2";
import Store from '../../../../services/api/store';

export default function StoreForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        store_name: "",
        location: "",
        address: "",
    });

    // อัปเดตค่าฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log("formData",formData);
        
    };

    // บันทึกข้อมูล (สร้างร้าน)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await Store.create({ data: formData });
            router.push("/admin/home");  // เพิ่มการ redirect หลังการบันทึก
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
        }
    };

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
                <Container maxWidth="md">
                    <Card sx={{ p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                                เพิ่มร้าน/กิจการ
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* ชื่อร้าน/กิจการ */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="ชื่อร้าน/กิจการ"
                                            name="store_name"
                                            value={formData.store_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>

                                    {/* จังหวัด */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="จังหวัด"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>

                                    {/* ที่อยู่ */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="ที่อยู่"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>

                                    {/* ปุ่มบันทึก */}
                                    <Grid item xs={12} sx={{ textAlign: "right", mt: 2 }}>
                                        <Button type="submit" variant="contained" color="success" size="large">
                                            บันทึก
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </div>
    );
}