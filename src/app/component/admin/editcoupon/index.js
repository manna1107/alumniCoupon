"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { Box, Container, TextField, Button, Grid, Typography, Card, CardMedia, CardContent, FormControl, InputLabel, MenuItem, Select , Autocomplete } from "@mui/material";
import Header from "../../header2";
import Coupon from '../../../../services/api/coupon';
import Store from '../../../../services/api/store';


export default function CouponForm() {
    const router = useRouter();
    const { coupon_id } = useParams();
    const idAsInt = Number(coupon_id);

    console.log("idAsInt",idAsInt);

    const [formData, setFormData] = useState({
        name_coupon: "",
        start_Date: "",
        end_Date: "",
        type: "",
        number_of_coupons: 0,
        details: ""
    });


    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
     const [dataStore, setDataStore] = useState();

    useEffect(() => {

        async function getDataById() {
            try {       
              const getdataById = await Coupon.getByCoupon(idAsInt);
              setFormData(getdataById.body)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          getDataById();

          async function getStore() {
            try {
                const stores = await Store.getAll();
                setDataStore(stores.body)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getStore();
    

        }, [coupon_id]);

        
      


    //อัปเดตค่าฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "store_id") {
            setFormData({
                ...formData,
                [name]: value ? Number(value) : null,
            });
        }
        else if (name === "number_of_coupons") {
            setFormData({
                ...formData,
                [name]: value ? Number(value) : null,
            });
        }
        else if (name === 'start_Date' || name === 'end_Date') {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            selectedDate.setHours(currentDate.getHours(), currentDate.getMinutes(), 0, 0);

            setFormData({
                ...formData,
                [name]: selectedDate.toISOString(),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        console.log("from now ", formData);
    };



    //จัดการไฟล์รูปภาพ
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // บันทึกข้อมูล
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                await Coupon.update(idAsInt ,formData);
                router.push("/admin/home"); 
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    };

    //console.log(Date)

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
                <Container maxWidth="md">
                    <Card sx={{ p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
                        <CardContent>
                            {/* 🔹 ข้อความ "เพิ่มคูปอง" แสดงก่อน */}
                            <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                                เพิ่มคูปอง
                            </Typography>

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={2} sx ={{ mt:2}}>
                                    {/* ส่วนข้อมูลฟอร์ม */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                        fullWidth 
                                        label="ชื่อคูปอง" 
                                        name="name_coupon" 
                                        value={formData.name_coupon} 
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setFormData(prevState => ({
                                                ...prevState, 
                                                [name]: value,
                                            }));
                                        }}  
                                        required />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="ชื่อร้าน/กิจการ" type="number"  name="store_id" value={formData.store_id} onChange={handleChange} required InputLabelProps={{ shrink: true }}/>
                                    </Grid> */}
                                    <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        options={dataStore || []}
                                        getOptionLabel={(option) => option.store_name || ""}
                                        isOptionEqualToValue={(option, value) => option.store_id === value?.store_id}
                                        value={dataStore?.find(store => store.store_id === formData.store_id) || null}
                                        onChange={(event, newValue) => {
                                        handleChange({
                                            target: {
                                            name: "store_id",
                                            value: newValue ? newValue.store_id : "", // ใช้ "" แทน null
                                            },
                                        });
                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="เลือกร้านค้า"
                                            required
                                            disabled={!dataStore}
                                            value={formData.store_id || ""} // แก้ null ให้เป็น ""
                                        />
                                        )}
                                    />
                                    </Grid>

                                    {/* <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="จังหวัด" name="location" value={formData.location} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="ที่อยู่" name="address" value={formData.address} onChange={handleChange} required />
                                    </Grid> */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                        fullWidth 
                                        type="date" 
                                        label="ระยะเวลาการใช้คูปอง (จาก)" 
                                        name="start_Date" 
                                        value={formData.start_Date ? formData.start_Date.split("T")[0] : ""} 
                                        onChange={handleChange} 
                                            InputLabelProps={{ shrink: true }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                        fullWidth 
                                        type="date" 
                                        label="ถึง" 
                                        name="end_Date" 
                                        value={formData.end_Date ? formData.end_Date.split("T")[0] : ""} 
                                        onChange={handleChange} 
                                        InputLabelProps={{ shrink: true }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                        fullWidth 
                                        label="ประเภทคูปอง" 
                                        name="type" 
                                        value={formData.type} 
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setFormData(prevState => ({
                                                ...prevState, 
                                                [name]: value,
                                            }));
                                        }}  
                                        required />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                        fullWidth 
                                        label="จำนวนคูปอง" 
                                        type="number" 
                                        name="number_of_coupons" 
                                        value={formData.number_of_coupons || ""} 
                                        onChange={handleChange}  
                                        required 
                                        InputProps={{ inputProps: { min: 1 } }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                        fullWidth 
                                        label="เงื่อนไขการใช้งาน" 
                                        name="details" 
                                        value={formData.details} 
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setFormData(prevState => ({
                                                ...prevState, 
                                                [name]: value,
                                            }));
                                        }}  
                                        multiline rows={4} />
                                    </Grid>
                                    {/* อัปโหลดรูปภาพ */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">อัปโหลดรูปภาพ(ถ้ามี) :</Typography>
                                        <input type="file" accept="image/*" onChange={handleImageChange} />
                                    </Grid>
                                    {/* 🔹 แสดงรูปถ้ามีอัปโหลด */}
                                    {previewImage && (
                                        <CardMedia
                                            component="img"
                                            image={previewImage}
                                            alt="Coupon Preview"
                                            sx={{
                                                maxWidth: "200px",  // จำกัดความกว้างของรูปภาพ 
                                                height: "120",  // ให้ปรับสูงอัตโนมัติตามสัดส่วน
                                                borderRadius: 2,
                                                objectFit: "contain",
                                                display: "block",
                                                margin: "0 auto", // จัดให้อยู่กึ่งกลาง
                                                mb: 2,
                                                mt: 2
                                            }}
                                        />
                                    )}

                                    {/* ปุ่มบันทึก */}
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
