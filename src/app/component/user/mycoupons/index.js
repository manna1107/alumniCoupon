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
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import Header from '../../header';
import Save from '../../../../services/api/save';

export default function ActiveCouponsPage({ response, responseStore, responseSave }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [textStatus, setTextStatus] = useState("ใช้แล้ว");
  const [CouponIdOnChange, setCouponIdOnChange] = useState();
  const [StatusOfCoupon, setStatusOfCoupon] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchCouponStatus = async () => {
   
      if (status === "loading") {
        return <p>กำลังโหลดข้อมูล...</p>;
      }
        const statusData = await Save.GetByUser(session?.user?.id);
        setStatusOfCoupon(statusData?.coupon_used_at);
    };
    fetchCouponStatus();
  }, [[session, status, router]]);
 

  const userSavedCoupons = responseSave.filter((saved) => saved.user_id === session?.user?.id);

  const savedCoupons = response.filter((coupon) =>
    userSavedCoupons.some((saved) => saved.coupon_id === coupon.coupon_id)
  );


  // ✅ กรองคูปองตาม searchTerm
  const filteredCoupons = savedCoupons.filter((coupon) => {
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

  const handleClickOpen = (coupon) => {
    console.log("CouponIdOnChange", coupon.coupon_id);
    setCouponIdOnChange(coupon.coupon_id)
    setSelectedCoupon(coupon);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmUseCoupon = async () => {
    try {

      const dataResalt = {
        user_id : session?.user?.id,
        coupon_used_at : textStatus
      }

      await Save.update(Number(CouponIdOnChange), dataResalt );
      setOpen(false);
     window.location.reload()
    } catch (error) {
      console.error("Error using coupon:", error);
      alert("ไม่สามารถใช้คูปองได้");
    }
  };

  return (
    <div>
      <Header sx={{ width: "100%" }} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h3" align="left" sx={{ mb: 2, mt: 4 }}>
              คูปองของฉัน
            </Typography>
            <TextField
              label="ค้นหาคูปอง"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "300px", mt: 2 }}
            />
          </Box>

          <Grid container spacing={3}>
            {filteredCoupons.map((coupon) => {
              const store = responseStore.find((store) => store.store_id === coupon.store_id);
              return (
                <Grid item xs={12} key={coupon.coupon_id}>
                  <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 3, boxShadow: 3, width: "100%", minHeight: 150, p: 2 }}>
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {coupon.name_coupon}
                      </Typography>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Typography color="textSecondary">⏳ เริ่ม: {new Date(coupon.start_Date).toLocaleDateString("th-TH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </Typography>
                        <Typography color="error"> หมดอายุ: {new Date(coupon.end_Date).toLocaleDateString("th-TH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Typography color="textSecondary"> ร้าน: {store ? store.store_name : "ไม่พบข้อมูล"}</Typography>
                        <Typography color="textSecondary"> จังหวัด: {store ? store.location : "ไม่พบข้อมูล"}</Typography>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Typography color="textSecondary"> ประเภท: {coupon.type}</Typography>
                      </div>
                    </CardContent>
                    <CardContent sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                      <Button variant="contained" color="success" sx={{ mt: 2, width: "120px" }} onClick={() => handleClickOpen(coupon)}
                        disabled={userSavedCoupons.some((saved) => saved.coupon_id === coupon.coupon_id && saved.coupon_used_at === "ใช้แล้ว")}
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
        {selectedCoupon ? (
          <>
           <Typography variant="h6" fontWeight="bold">
                {selectedCoupon.name_coupon}
              </Typography>
            <DialogContentText>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <Typography color="textSecondary">
                ร้าน: {responseStore.find(store => store.store_id === selectedCoupon.store_id)?.store_name || "ไม่พบข้อมูล"}
              </Typography>
              <Typography color="textSecondary">
                จังหวัด: {responseStore.find(store => store.store_id === selectedCoupon.store_id)?.location || "ไม่พบข้อมูล"}
              </Typography>
              <Typography color="textSecondary">
                ประเภท: {selectedCoupon.type}
              </Typography>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <Typography color="textSecondary">
                ⏳ เริ่ม: {new Date(selectedCoupon.start_Date).toLocaleDateString("th-TH", {
                  day: "2-digit", month: "2-digit", year: "2-digit"
                })}
              </Typography>
              <Typography color="error">
                หมดอายุ: {new Date(selectedCoupon.end_Date).toLocaleDateString("th-TH", {
                  day: "2-digit", month: "2-digit", year: "2-digit"
                })}
              </Typography>
              </div>
              <Typography color="textSecondary">
                เงื่อนไขการใช้งาน: {selectedCoupon.details}
              </Typography>
            </DialogContentText>
          </>
        ) : (
          <DialogContentText>กำลังโหลดข้อมูล...</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">ยกเลิก</Button>
        <Button onClick={handleConfirmUseCoupon} color="primary">ยืนยัน</Button>
      </DialogActions>
    </Dialog>
      </Box>
    </div>
  );
}
