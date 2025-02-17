"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Container,  Button,Typography, Card, CardContent,Grid, CircularProgress } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Header from "../../../component/header";
import Save from '../../../../services/api/save'

export default function MyTicketPage({ response, responseStore, responseSave }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  
  const handleUseCoupon = async (couponId) => {
    const confirmUse = window.confirm("คุณต้องการใช้คูปองนี้หรือไม่?");
    if (!confirmUse) return;
  
    try {
      const response = await Save.useCoupon({ coupon_id: couponId, user_id: session.user.id });
  
      if (response.success) {
        alert("ใช้คูปองสำเร็จ!");
        // สามารถเพิ่ม logic โหลดข้อมูลใหม่หรือ redirect ได้
      } else {
        alert("เกิดข้อผิดพลาดในการใช้คูปอง");
      }
    } catch (error) {
      console.error("Error using coupon:", error);
      alert("ไม่สามารถใช้คูปองได้");
    }
  };

    const handleClickOpen = (couponId) => {
      setSelectedCoupon(couponId);
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleConfirmUseCoupon = async () => {
      try {
        const response = await Save.useCoupon({ coupon_id: selectedCoupon, user_id: session.user.id });
    
        if (response.success) {
          alert("ใช้คูปองสำเร็จ!");
          setOpen(false);
        } else {
          alert("เกิดข้อผิดพลาดในการใช้คูปอง");
        }
      } catch (error) {
        console.error("Error using coupon:", error);
        alert("ไม่สามารถใช้คูปองได้");
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
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Typography variant="h6">
                        {couponsss ? couponsss.name_coupon : "ไม่พบข้อมูล"}
                      </Typography>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <Typography>⏳ เริ่ม: {new Date(couponsss.start_Date).toLocaleDateString()}</Typography>
                      <Typography color="error">หมดอายุ: {new Date(couponsss.end_Date).toLocaleDateString()}</Typography>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <Typography>ร้าน: {store ? store.store_name : "ไม่พบข้อมูล"}</Typography>
                      <Typography>จังหวัด: {store ? store.location : "ไม่พบข้อมูล"}</Typography>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <Typography>ประเภท: {couponsss ? couponsss.type : "ไม่พบข้อมูล"}</Typography>
                      <Typography>จำนวน: {couponsss ? couponsss.number_of_coupons : "ไม่พบข้อมูล"} ใบ</Typography>
                      </div>
                    </CardContent>
                    <CardContent sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, width: "120px" }}
                      onClick={() => handleClickOpen(coupon.coupon_id)}
                    >
                      ใช้คูปอง
                    </Button>
                  </CardContent>

                  </Card>
                </Grid>
                
              );
            })}
        </Grid>
      </Container>
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ยืนยันการใช้คูปอง</DialogTitle>
          <DialogContent>
            <DialogContentText>
              คุณต้องการใช้คูปองนี้หรือไม่? โปรดยืนยันการดำเนินการ
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              ยกเลิก
            </Button>
            <Button onClick={handleConfirmUseCoupon} color="primary">
              ยืนยันการใช้คูปอง
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}