"use client";

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
} from "@mui/material";
import Header from '../../header';
import Save from '../../../../services/api/save'


export default function ActiveCouponsPage({ response, responseStore }) {
  const [saving, setSaving] = useState(false);
  const [savedCoupons, setSavedCoupons] = useState({});
  

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  const handleSaveCoupon = async (coupon) => {
    try {
      await Save.create({
        data: {
          user_id: session.user.id,
          coupon_id: coupon.coupon_id,
          saved_at: new Date(),
        }
      });
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div>
      <Header sx={{ width: "100%" }} />
      <Container sx={{ mt: 16 }}>
        <Typography variant="h4" gutterBottom>
          ️ คูปองที่ใช้งานได้ในปัจจุบัน
        </Typography>

        <Grid container spacing={3}>
          {response.map((coupon) => {
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
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight="bold">
                      {coupon.name_coupon}
                    </Typography>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <Typography color="textSecondary">⏳ เริ่ม: {new Date(coupon.start_Date).toLocaleDateString()}</Typography>
                    <Typography color="error"> หมดอายุ: {new Date(coupon.end_Date).toLocaleDateString()}</Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <Typography color="textSecondary"> ร้าน: {store ? store.store_name : "ไม่พบข้อมูล"}</Typography>
                    <Typography color="textSecondary"> จังหวัด: {store ? store.location : "ไม่พบข้อมูล"}</Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <Typography color="textSecondary"> ประเภท: {coupon.type}</Typography>
                    <Typography color="textSecondary"> จำนวน: {coupon.number_of_coupons} ใบ</Typography>
                    </div>
                  </CardContent>
                  <CardContent sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, width: "120px" }}
                      onClick={() => handleSaveCoupon(coupon)}
                      disabled={savedCoupons[coupon.coupon_id] || saving}
                    >
                      {savedCoupons[coupon.coupon_id]
                        ? "✅ เก็บแล้ว"
                        : saving
                          ? "⏳ กำลังบันทึก..."
                          : " เก็บคูปอง"}
                    </Button>
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