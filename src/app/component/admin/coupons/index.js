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
  Box,
} from "@mui/material";
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

  // ถ้าไม่มีข้อมูลคูปอง ให้แสดงข้อความว่า "ไม่พบคูปอง"
  if (!coupons.length) {
    return (
      <div>
        <Header sx={{ width: "100%" }} />
        <Container sx={{ mt: 16 }}>
          <Typography variant="h4" gutterBottom>
            🎟️ คูปองทั้งหมด
          </Typography>
          <Typography color="error">❌ ไม่มีคูปองที่พบ</Typography>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header sx={{ width: "100%" }} />
      <Container sx={{ mt: 16 }}>
        <Typography variant="h4" gutterBottom>
          🎟️ คูปองทั้งหมด
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
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
