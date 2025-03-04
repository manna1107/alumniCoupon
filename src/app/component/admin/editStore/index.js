"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';


import { Box, Container, TextField, Button, Grid, Typography, Card, CardContent } from "@mui/material";
import Header from "../../header2";
import Store from '../../../../services/api/store';

export default function StoreForm() {
    const router = useRouter();
    const { store_id } = useParams();
    const idAsInt = Number(store_id);
    
    console.log("idAsInt",idAsInt);
    
    const [formData, setFormData] = useState({
      store_name: "",
      location : "",
      address : "" 
    });
    
    useEffect(() => {
        async function getDataById() {
          try {       
            const getdataById = await Store.getBystore(idAsInt);
            setFormData(getdataById.body)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        getDataById();
      }, [store_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                await Store.update(idAsInt ,formData);
                router.push("/admin/viewstore"); 
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
                <Container maxWidth="md">
                    <Card sx={{ p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                                แก้ไขร้าน/กิจการ
                            </Typography>

                            <form onSubmit={handleSubmit} >
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="ชื่อร้าน/กิจการ"                              
                                            name="store_name"
                                            value={formData.store_name}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setFormData(prevState => ({
                                                    ...prevState, 
                                                    [name]: value,
                                                }));
                                            }}
                                            
                                            InputLabelProps={{ shrink: true }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="จังหวัด"
                                            name="location"
                                            value={formData.location}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setFormData(prevState => ({
                                                    ...prevState, 
                                                    [name]: value,
                                                }));
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="ที่อยู่"
                                            name="address"
                                            value={formData.address}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setFormData(prevState => ({
                                                    ...prevState, 
                                                    [name]: value,
                                                }));
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ textAlign: "right", mt: 2 }}>
                                        <Button type="submit" variant="contained" color="success" size="large">
                                            อัพเดท
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