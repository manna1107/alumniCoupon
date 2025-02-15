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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Header from "../../header2";

export default function ActiveCouponsPage({ response, responseStore }) {
  const [coupons, setCoupons] = useState(response || []);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // ฟังก์ชันลบคูปอง
  const handleDeleteCoupon = async (coupon) => {
    if (!confirm(`คุณต้องการลบคูปอง "${coupon.name_coupon}" ใช่หรือไม่?`)) return;

    try {
      const response = await fetch("/api/coupon", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon_id: coupon.coupon_id }),
      });

      if (!response.ok) {
        throw new Error("ไม่สามารถลบคูปองได้");
      }

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
      <Container sx={{ mt: 16 }}>
        <Typography variant="h4" gutterBottom>
          🎟️ คูปองที่ใช้งานได้ในปัจจุบัน
        </Typography>

        <Grid container spacing={3}>
          {coupons.map((coupon) => {
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
                        onClick={() => router.push(`/admin/form`)}
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
          })}
        </Grid>
      </Container>
    </div>
  );
}
