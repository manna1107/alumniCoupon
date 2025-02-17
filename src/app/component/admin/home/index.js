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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Header from "../../header2";

export default function ActiveCouponsPage({ response, responseStore }) {
  const [coupons, setCoupons] = useState(response || []);
  const [filteredCoupons, setFilteredCoupons] = useState(response || []);
  const [storeFilter, setStoreFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    let filtered = coupons;

    if (storeFilter) {
      filtered = filtered.filter((coupon) =>
        responseStore.some(
          (store) => store.store_id === coupon.store_id && store.store_name === storeFilter
        )
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((coupon) => coupon.type === typeFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((coupon) =>
        responseStore.some(
          (store) => store.store_id === coupon.store_id && store.location === locationFilter
        )
      );
    }

    setFilteredCoupons(filtered);
  }, [storeFilter, typeFilter, locationFilter, coupons, responseStore]);

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
      <Container sx={{ mt: 18 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
          🎟️ คูปองที่ใช้งานได้ในปัจจุบัน
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {/* Filter by Store */}
          <FormControl fullWidth>
            <InputLabel>ร้าน</InputLabel>
            <Select
              value={storeFilter}
              label="ร้าน"
              onChange={(e) => setStoreFilter(e.target.value)}
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {responseStore.map((store) => (
                <MenuItem key={store.store_id} value={store.store_name}>
                  {store.store_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filter by Type */}
          <FormControl fullWidth>
            <InputLabel>ประเภท</InputLabel>
            <Select
              value={typeFilter}
              label="ประเภท"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {response.map((coupon) => (
                <MenuItem key={coupon.coupon_id} value={coupon.type}>
                  {coupon.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filter by Location */}
          <FormControl fullWidth>
            <InputLabel>จังหวัด</InputLabel>
            <Select
              value={locationFilter}
              label="จังหวัด"
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {responseStore
                .map((store) => store.location)
                .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                .map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        {/* Coupons Display */}
        <Grid container spacing={3} mt={2}>
          {filteredCoupons.map((coupon) => {
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
          })}
        </Grid>
      </Container>
    </div>
  );
}
