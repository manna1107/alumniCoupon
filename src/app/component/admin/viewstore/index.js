"use client";

import { useState } from "react";
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import Header from "../../header2";

export default function StoreList({ responseStore }) {
    const [searchTerm, setSearchTerm] = useState("");

    // ฟังก์ชันกรองข้อมูลตามคำค้นหา
    const filteredStores = responseStore.filter((store) => {
        const storeName = store.store_name.toLowerCase();
        const storeLocation = store.location.toLowerCase();
        const storeAddress = store.address.toLowerCase();
        const searchLowerCase = searchTerm.toLowerCase();

        return (
            storeName.includes(searchLowerCase) ||
            storeLocation.includes(searchLowerCase) ||
            storeAddress.includes(searchLowerCase)
        );
    });

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
                <Container maxWidth="lg">
                    {/* กล่องที่มีข้อความด้านซ้ายและช่องค้นหาด้านขวา */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h3" align="left" sx={{  mb: 2, mt: 4 }}>
                            ร้าน/กิจการ
                        </Typography>

                        {/* ช่องค้นหาอยู่ขวามือ */}
                        <TextField
                            label="ค้นหาร้าน/กิจการ"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: "300px", mt: 2 }} // ขนาดของช่องค้นหา
                        />
                    </Box>

                    {/* แสดงข้อมูลในรูปแบบตาราง */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#1976d2" }}> {/* เปลี่ยนสีพื้นหลังของแถวหัวตาราง */}
                                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ลำดับ</TableCell>
                                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ชื่อร้าน/กิจการ</TableCell>
                                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>จังหวัด</TableCell>
                                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ที่อยู่</TableCell>
                                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>แก้ไข</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredStores?.length > 0 ? (
                                    filteredStores.map((store, index) => (
                                        store && (
                                            <TableRow key={store.store_id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{store.store_name || "-"}</TableCell>
                                                <TableCell align="center">{store.location || "-"}</TableCell>
                                                <TableCell align="center">{store.address || "-"}</TableCell>
                                                <TableCell align="center">
                                                    {/* ปุ่มแก้ไข */}
                                                    <Button variant="outlined" size="small" href={`/admin/store/${store.store_id}`}>
                                                        แก้ไข
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align="center" colSpan={5} sx={{ fontStyle: "italic", color: "gray" }}>
                                            ไม่มีข้อมูลร้านค้า
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>
            </Box>
        </div>
    );
}
