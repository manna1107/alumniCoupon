"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import Header from "../../header2";
import Coupon from "../../../../services/api/coupon";

export default function ActiveCouponsPage({ response, responseStore  }) {
  const [coupons, setCoupons] = useState(response || []);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // ฟังก์ชันค้นหา
  const filteredCoupons = coupons.filter((coupon) => {
    const store = responseStore.find((store) => store.store_id === coupon.store_id);
    const searchLower = searchQuery.toLowerCase();

    return (
      coupon.name_coupon.toLowerCase().includes(searchLower) ||
      (store?.store_name || "").toLowerCase().includes(searchLower) ||
      (store?.location || "").toLowerCase().includes(searchLower)
    );
  });

  // ฟังก์ชันลบคูปอง
  const handleDeleteCoupon = async (coupon) => {
    if (!confirm(`คุณต้องการลบคูปอง "${coupon.name_coupon}" ใช่หรือไม่?`)) return;

    try {
      await Coupon.remove(coupon.coupon_id);

      alert("คูปองถูกลบแล้ว!");
      setCoupons((prevCoupons) =>
        prevCoupons.filter((c) => c.coupon_id !== coupon.coupon_id)
      );
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบคูปอง:", error);
    }
  };

  return (
    <div>
      <Header sx={{ width: "100%" }} />
      <Container sx={{ mt: 18 }}>
        <Typography variant="h4" gutterBottom sx={{  mb: 2 }}>
          🎟️ คูปองที่ใช้งานได้ในปัจจุบัน
        </Typography>

        {/* Search Field */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="🔍 ค้นหาคูปอง, ร้านค้า หรือจังหวัด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Coupons Display */}
        <Grid container spacing={3} mt={2}>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => {
              const store = responseStore.find(
                (store) => store.store_id === coupon.store_id
              );

              return (
                <Grid item xs={12} key={coupon.coupon_id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 3,
                      boxShadow: 3,
                      width: "100%",
                      minHeight: 150,
                      p: 2,
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {coupon.name_coupon}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Typography color="textSecondary">
                          ⏳ เริ่ม: {new Date(coupon.start_Date).toLocaleDateString()}
                        </Typography>
                        <Typography color="error">
                          หมดอายุ: {new Date(coupon.end_Date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Typography color="textSecondary">
                          ร้าน: {store ? store.store_name : "ไม่พบข้อมูล"}
                        </Typography>
                        <Typography color="textSecondary">
                          จังหวัด: {store ? store.location : "ไม่พบข้อมูล"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Typography color="textSecondary">ประเภท: {coupon.type}</Typography>
                        <Typography color="textSecondary">
                          จำนวน: {coupon.number_of_coupons} ใบ
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: "#FFA500" }}
                          startIcon={<Edit />}
                          onClick={() => router.push(`/admin/form/${coupon.coupon_id}`)}
                        >
                          แก้ไข
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteCoupon(coupon)}
                        >
                          ลบ
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Typography color="error" sx={{ mt: 2 }}>
              ❌ ไม่พบคูปองที่ตรงกับคำค้นหา
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}
