// pages/login.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, googleAuthProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { Container, Button, Typography } from '@mui/material';

export default function Login() {
  const router = useRouter();

  // Redirect to home if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      router.push('/');
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
    </Container>
  );
}
