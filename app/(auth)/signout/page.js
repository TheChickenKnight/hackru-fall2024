"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignOut() {
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        if (typeof window === 'undefined') {
            // Ensure this code runs only on the client side
            return;
        }

        // Replace this with your actual authentication check logic
        async function checkAuthStatus() {
            try {
                const response = await fetch('/api/auth/status');
                const data = await response.json();
                setIsSignedIn(data.isAuthenticated);
            } catch (error) {
                console.error('Failed to check authentication status', error);
            }
        }

        checkAuthStatus();
    }, []);

    async function handleSignOut() {
        if (!isSignedIn) {
            toast.error("You are not signed in.");
            return;
        }

        try {
            const response = await fetch('/api/sign/out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success("You have been signed out successfully.");
                router.push('/');
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || "Failed to sign out. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to sign out. Please try again.");
        }
    }

    if (!isClient) {
        return null; // Render nothing on the server side
    }

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleSignOut}>Sign Out</button>
            <ToastContainer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#0070f3',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default SignOut;