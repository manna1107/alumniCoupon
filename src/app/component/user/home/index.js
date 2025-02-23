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
import Header from "../../header";
import Save from "../../../../services/api/save";

export default function ActiveCouponsPage({ response, responseStore, savedCoupon }) {
  const [saving, setSaving] = useState(false);
  const [savedCoupons, setSavedCoupons] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [couponFind, setCouponFind] = useState([]);
  const [userId, setUserID] = useState();
  const [savedCouponsData, setSavedCouponsData] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();



  useEffect(() => {
    if (status === "loading") {
      return; 
    }

    if (status === "unauthenticated") {
      router.push("/"); 
    } else {
      localStorage.setItem("SessionId", session.user.id);
      setUserID(session.user.id); 

      const fetchData = async () => {
        const res = await Save.GetByUser(session.user.id);
        setCouponFind(res.body);
      };
      fetchData();
    }
  }, [session, status, router]);

  

  const handleSaveCoupon = async (coupon) => {
    if (savedCoupons[coupon.coupon_id]) return;

    try {
      await Save.create({
        data: {
          user_id: session.user.id,
          coupon_id: coupon.coupon_id,
          saved_at: new Date(),
          coupon_used_at: "ยังไม่ได้ใช้งาน",
        },
      });

      setSavedCoupons((prevState) => ({
        ...prevState,
        [coupon.coupon_id]: true,
      }));
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const sortedCoupons = response || [];

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
            <Typography variant="h3" align="left" sx={{ mb: 2, mt: 4 }}>
              คูปองแนะนำ
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

              const savedCouponsCount = savedCoupon.filter((savedCouponn) => {
                return savedCouponn.coupon_id === coupon.coupon_id;
              }).length;

              const isMaxLimit = coupon.number_of_coupons - savedCouponsCount;

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
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {coupon.name_coupon}
                      </Typography>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Typography color="textSecondary">
                          ⏳ เริ่ม: {new Date(coupon.start_Date).toLocaleDateString()}
                        </Typography>
                        <Typography color="error">
                          หมดอายุ: {new Date(coupon.end_Date).toLocaleDateString()}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Typography color="textSecondary">ร้าน: {store ? store.store_name : "ไม่พบข้อมูล"}</Typography>
                        <Typography color="textSecondary">จังหวัด: {store ? store.location : "ไม่พบข้อมูล"}</Typography>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Typography color="textSecondary">ประเภท: {coupon.type}</Typography>
                        <Typography color="textSecondary">จำนวน: {coupon.number_of_coupons} ใบ</Typography>
                      </div>
                    </CardContent>
                    <CardContent sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        color={savedCoupons[coupon.coupon_id] ? "success" : "primary"}
                        sx={{ mt: 2, width: "120px" }}
                        onClick={() => handleSaveCoupon(coupon)}
                        disabled={isMaxLimit <= 0 || savedCoupons[coupon.coupon_id]}// ปิดใช้งานเมื่อบันทึกแล้ว
                      >
                        {savedCoupons[coupon.coupon_id] ? "✔️ เก็บแล้ว" : "เก็บคูปอง"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
