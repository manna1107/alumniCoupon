'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import Image from 'next/image'
import { getSession } from 'next-auth/react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  
  const handleLogin = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    setError('') 
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email : email,
        password : password
      })

      if (result.error) {
        setError('Invalid email or password') 
        return
      }

      const session = await getSession()
      if (session.user.role === "admin") {
        router.push("/admin/home")
      } else if (session.user.role === "user") {
        router.push("/user/home")
       
      }

    } catch (error) {
      setError('Something went wrong. Please try again.')
      console.error('Error:', error)
    }
  
  }

  return (
    <Box
      sx={{
        minHeight: "100vh", 
        display: "flex",
        justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#1976D2", // ✅ เปลี่ยนเป็น path ของรูปภาพ
        backgroundSize: "cover",
        backgroundPosition: "30% 0%", // 30% จากซ้าย, 70% จากบน
        backgroundRepeat: "no-repeat",
        padding: 3,
      }}
    >
    <Container maxWidth="sm">
      <Box mt={16} p={3} boxShadow={3} borderRadius={2} bgcolor="rgb(255, 255, 255, 0.9)" textAlign="center">
        <Image src="/picture/PSU-ARMS.png" alt="Logo" width={180} height={120} />
        <Typography variant="h5" gutterBottom>
          ระบบคูปองศิษย์เก่าสัมพันธ์
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
          <TextField
            label="อีเมล"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="รหัสผ่าน"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
    </Box>
  )
  
}
