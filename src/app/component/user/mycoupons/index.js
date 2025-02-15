"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container,  Button,Typography, Card, CardContent,Grid, CircularProgress } from "@mui/material";
import Header from "../../../component/header";
import Save from '../../../../services/api/save'

export default function MyTicketPage({ response, responseStore, responseSave }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Header sx={{ width: "100%" }} />
      <Container sx={{ mt: 16 }}>
        <Typography variant="h4" gutterBottom>
          ️ คูปองที่ใช้งานได้ในปัจจุบัน
        </Typography>
  
        <Grid container spacing={3}>
          {responseSave
            .filter(coupon => coupon.user_id === session.user.id) 
            .map((coupon, index) => {
              
              const store = responseStore.find(
                (store) => store.store_id === coupon.coupon_id
              );

              const couponsss = response.find(
                (coupons) => coupons.coupon_id === coupon.coupon_id
              );

              return (
                <Grid item xs={12} key={`${coupon.coupon_id}-${index}`}>
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
                    <CardContent>
                      <Typography variant="h6">
                        📌 {store ? store.store_name : "ไม่พบข้อมูล"}
                      </Typography>
                      <Typography>🏪 ร้านค้า: {store ? store.store_name : "ไม่พบข้อมูล"}</Typography>
                      <Typography>📋 ประเภท: {couponsss ? couponsss.type : "ไม่พบข้อมูล"}</Typography>
                      <Typography>🔢 จำนวน: {couponsss ? couponsss.number_of_coupons : "ไม่พบข้อมูล"} ใบ</Typography>
                    </CardContent>
                    <CardContent
                      sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                    >

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