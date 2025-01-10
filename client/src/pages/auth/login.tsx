import { Container, TextInput, Button, Space } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const response = await axios.post('/api/auth/login', values);
            console.log('Login response:', response);
            
            if (response.data.hasErrors) {
                showNotification({
                    message: response.data.errors[0]?.message || "Login failed",
                    color: "red"
                });
                return;
            }

            // Store the token
            localStorage.setItem('token', response.data.data.token);
            
            // Navigate to activities page
            navigate('/activities');
            
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