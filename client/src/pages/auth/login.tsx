import { Container, TextInput, Button, Space } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "../../config/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    });

    // Redirect if already authenticated
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/activities';
        navigate(from, { replace: true });
        return null;
    }

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await login(values.username, values.password);
            
            const from = location.state?.from?.pathname || '/activities';
            navigate(from, { replace: true });
            
            showNotification({
                message: "Login successful",
                color: "green"
            });
        } catch (error: any) {
            console.error('Login error:', error.response || error);
            showNotification({
                message: error.response?.data?.errors?.[0]?.message || "Login failed",
                color: "red"
            });
        }
    };

    return (
        <Container size="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Username"
                    {...form.getInputProps('username')}
                    required
                />
                <TextInput
                    type="password"
                    label="Password"
                    {...form.getInputProps('password')}
                    required
                />
                <Space h="md" />
                <Button type="submit" fullWidth>Login</Button>
            </form>
        </Container>
    );
};