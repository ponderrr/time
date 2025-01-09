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
            console.log('Login attempt:', values);
            const response = await axios.post('/api/auth/login', values);
            console.log('Response:', response.data);
            if (!response.data.hasErrors) {
                navigate('/activities');
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification({
                message: "Invalid credentials",
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
                />
                <TextInput
                    type="password"
                    label="Password"
                    {...form.getInputProps('password')}
                />
                <Space h="md" />
                <Button type="submit" fullWidth>Login</Button>
            </form>
        </Container>
    );
};