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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import Header from '../../header';
import Save from '../../../../services/api/save';

export default function ActiveCouponsPage({ response, responseStore }) {
  const [saving, setSaving] = useState(false);
  const [savedCoupons, setSavedCoupons] = useState({});

  const [couponTypeFilter, setCouponTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

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

      // Update saved coupons state to reflect that coupon has been saved
      setSavedCoupons((prevState) => ({
        ...prevState,
        [coupon.coupon_id]: true,
      }));
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const uniqueCouponTypes = [...new Set(response.map((coupon) => coupon.type))];
  const uniqueLocations = [...new Set(responseStore.map((store) => store.location))];

  // Filter coupons based on selected filters
  const filteredCoupons = response.filter((coupon) => {
    const store = responseStore.find((store) => store.store_id === coupon.store_id);
    const isTypeMatch = couponTypeFilter ? coupon?.type === couponTypeFilter : true;
    const isLocationMatch = locationFilter ? store?.location === locationFilter : true;
    return isTypeMatch && isLocationMatch;
  });

  return (
    <div>
      <Header sx={{ width: "100%" }} />
      <Container sx={{ mt: 16 }}>
        <Typography variant="h4" gutterBottom>
          ️ คูปองที่ใช้งานได้ในปัจจุบัน
        </Typography>

        {/* Filter Options */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>ประเภทคูปอง</InputLabel>
            <Select
              value={couponTypeFilter}
              onChange={(e) => setCouponTypeFilter(e.target.value)}
              label="ประเภทคูปอง"
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {uniqueCouponTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>จังหวัด</InputLabel>
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              label="จังหวัด"
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {uniqueLocations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredCoupons.map((coupon) => {
            const store = responseStore.find(
              (store) => store.store_id === coupon.store_id
            );

            // Check if the user has already saved the maximum allowed number of coupons for this type
            const isCouponSaved = savedCoupons[coupon.coupon_id];
            const isMaxCouponsSaved = isCouponSaved || savedCoupons[coupon.coupon_id] >= coupon.number_of_coupons;

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
                    {!isMaxCouponsSaved && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, width: "120px" }}
                        onClick={() => handleSaveCoupon(coupon)}
                        disabled={saving || isCouponSaved}
                      >
                        {isCouponSaved
                          ? "✅ เก็บแล้ว"
                          : saving
                          ? "⏳ กำลังบันทึก..."
                          : " เก็บคูปอง"}
                      </Button>
                    )}
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
