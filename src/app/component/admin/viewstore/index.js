"use client";
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Header from "../../header2";

export default function StoreList({ responseStore }) {

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2, mt: 4 }}>
                        รายการร้าน/กิจการ
                    </Typography>
                    {/* แสดงข้อมูลในรูปแบบตาราง */}
                    <TableContainer component={Paper} sx={{  mt: 4 }}>
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
                                {responseStore.map((store, index) => {
                                    return (
                                        <TableRow key={store.store_id}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{store.store_name}</TableCell>
                                            <TableCell align="center">{store.location}</TableCell>
                                            <TableCell align="center">{store.address}</TableCell>
                                            <TableCell align="center">
                                                {/* ปุ่มแก้ไข */}
                                                <Button variant="outlined" size="small" href={`/admin/store/${store.store_id}`}>
                                                    แก้ไข
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </div>
    );
}
