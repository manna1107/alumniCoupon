'use client';
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, TextField } from '@mui/material';

const coupons = [
    { id: 1, type: 'อาหาร', duration: '23/01/2025 - 27/01/2025', location: 'กรุงเทพฯ', title: 'ส่วนลด 30% ร้านศิษย์มินิมาร์ท' },
    { id: 2, type: 'เครื่องใช้', duration: '22/01/2025 - 30/01/2025', location: 'เชียงใหม่', title: 'ส่วนลด 20% เครื่องใช้ไฟฟ้า' },
    { id: 3, type: 'อาหาร', duration: '20/01/2025 - 25/01/2025', location: 'ภูเก็ต', title: 'ส่วนลด 10% อาหารทะเล' },
];

export default function Page() {
    const [filters, setFilters] = useState({ type: '', duration: '', location: '' });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredCoupons = coupons.filter((coupon) =>
        (!filters.type || coupon.type.includes(filters.type)) &&
        (!filters.duration || coupon.duration.includes(filters.duration)) &&
        (!filters.location || coupon.location.includes(filters.location))
    );

    return (
        <div>
            <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 2, mt: 4 }}>
                {/* Filter Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <TextField name="type" label="ประเภท" size="small" variant="outlined" value={filters.type} onChange={handleFilterChange} sx={{ flex: 1, marginRight: 1 }} />
                    <TextField name="duration" label="ระยะเวลา" size="small" variant="outlined" value={filters.duration} onChange={handleFilterChange} sx={{ flex: 1, marginRight: 1 }} />
                    <TextField name="location" label="จังหวัด" size="small" variant="outlined" value={filters.location} onChange={handleFilterChange} sx={{ flex: 1 }} />
                </Box>

                {/* Coupon List */}
                <Grid container spacing={2}>
                    {filteredCoupons.map((coupon) => (
                        <Grid item xs={12} key={coupon.id}>
                            <Card>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                backgroundColor: '#e0e0e0',
                                                marginRight: 2,
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body1">{coupon.title}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {coupon.duration}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button variant="contained" color="primary">
                                        เก็บคูปอง
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
