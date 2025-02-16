"use client";
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Header from "../../header2";

export default function StoreList({ responseStore }) {

    return (
        <div>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
                <Container maxWidth="md">
                    <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                        รายการร้าน/กิจการ
                    </Typography>
                    {/* แสดงข้อมูลในรูปแบบตาราง */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="center">ชื่อร้าน/กิจการ</TableCell>
                                    <TableCell align="center">จังหวัด</TableCell>
                                    <TableCell align="center">ที่อยู่</TableCell>
                                    <TableCell align="center">แก้ไข</TableCell>
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
