"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import Header from "../../header2";
import Save from '../../../../services/api/save';


export default function ActiveCouponsPage({ response, responseStore,savedCoupons }) {
  const [coupons, setCoupons] = useState(response || []);
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [savedCouponsData, setSavedCouponsData] = useState();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch saved coupons asynchronously
    const fetchSavedCoupons = async () => {
      const data = await Save.getAll();
      setSavedCouponsData(data);
    };

    fetchSavedCoupons();
  }, []); // This will run only once when the component mounts

  if (!coupons.length) {
    return (
      <div>
        <Header sx={{ width: "100%" }} />
        <Container sx={{ mt: 16 }}>
          <Typography variant="h3" gutterBottom>
            🎟️ คูปองทั้งหมด
          </Typography>
          <Typography color="error">❌ ไม่มีคูปองที่พบ</Typography>
        </Container>
      </div>
    );
  }

  // เรียงคูปองตาม start_Date (จากเก่าไปใหม่)
  const sortedCoupons = [...coupons].sort(
    (a, b) => new Date(a.start_Date) - new Date(b.start_Date)
  );

  // ฟิลเตอร์คูปองตามคำค้นหา
  const filteredCoupons = sortedCoupons.filter((coupon) => {
    const store = responseStore.find((store) => store.store_id === coupon.store_id);

    const storeName = store?.store_name?.toLowerCase() || "";
    const storeLocation = store?.location?.toLowerCase() || "";
    const couponName = coupon.name_coupon.toLowerCase();
    const couponType = coupon.type.toLowerCase();
    const startDate = new Date(coupon.start_Date).toLocaleDateString();
    const endDate = new Date(coupon.end_Date).toLocaleDateString();
    const searchLower = searchTerm.toLowerCase();

    return (
      storeName.includes(searchLower) ||
      storeLocation.includes(searchLower) ||
      couponName.includes(searchLower) ||
      couponType.includes(searchLower) ||
      startDate.includes(searchLower) ||
      endDate.includes(searchLower)
    );
  });

    return (
      <div>
        <Header sx={{ width: "100%" }} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Grid>
                <Typography variant="h3" align="left" sx={{ mb: 2, mt: 4 }}>
                  คูปองทั้งหมด
                </Typography>
              </Grid>
              <Grid>
                {/* ช่องค้นหา */}
                <TextField
                  label="ค้นหาคูปอง"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: "300px", mt: 2 }}
                />
              </Grid>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ลำดับ</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ชื่อคูปอง</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ร้านค้า</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>จังหวัด</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ประเภท</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>เริ่ม</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>หมดอายุ</TableCell>
                    <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>จำนวนที่เหลือ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCoupons.map((coupon, index) => {
                    const store = responseStore.find(
                      (store) => store.store_id === coupon.store_id
                    );
                    
                    const savedCouponsCount = savedCoupons.filter(
                      (savedCoupon) => savedCoupon.coupon_id === coupon.coupon_id
                    ).length;

                    const isMaxLimit = coupon.number_of_coupons - savedCouponsCount;

                    return (
                      <TableRow key={coupon.coupon_id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{coupon.name_coupon}</TableCell>
                        <TableCell align="center">{store ? store.store_name : "ไม่พบข้อมูล"}</TableCell>
                        <TableCell align="center">{store ? store.location : "ไม่พบข้อมูล"}</TableCell>
                        <TableCell align="center">{coupon.type}</TableCell>
                        <TableCell align="center">{new Date(coupon.start_Date).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })}</TableCell>
                        <TableCell align="center" sx={{ color: "red" }} >
                          {new Date(coupon.end_Date).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })}
                        </TableCell>
                        <TableCell align="center">{isMaxLimit} ใบ</TableCell>
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
