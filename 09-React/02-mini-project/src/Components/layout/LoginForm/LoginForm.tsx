import { SubmitHandler, useForm } from 'react-hook-form';
import "./LoginForm.css";
import { Box, Button, Divider, Stack, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { blue, grey, yellow } from '@mui/material/colors';

type formInputs = {
    userName: String
    password: String
    address: String
    age: number
    city: String
    country: String
}

function LoginForm(): JSX.Element {

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& input': { color: 'white' },
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                            '&.Mui-focused fieldset': { borderColor: blue[800] },
                        }
                    }
                }
            }
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<formInputs>();

    const onSubmit: SubmitHandler<formInputs> = (data) => {
        console.log(data);
        reset();
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                pt: 1,
                width: '20rem',
                mt: '2rem',
                mx: 'auto',
                borderRadius: 3,
                backgroundColor: grey[900],
                boxShadow: '1px 1px 10px 0.1px black'
            }}>
                <Typography variant='h4' component={'h4'}>Login Form</Typography>
                <Divider sx={{ backgroundColor: 'grey', m: 2 }} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction='column' gap={2} width={'100%'} alignItems='center'>
                        <TextField
                            size='small'
                            variant='outlined'
                            color="primary"
                            type="text"
                            label='User Name'
                            {...register("userName", { required: true, minLength: 8, maxLength: 16 })}
                            error={errors.userName ? true : false}
                            helperText={
                                errors.userName?.type === 'required' && 'this filed is required' ||
                                errors.userName?.type === 'minLength' && 'minimum length is not met' ||
                                errors.userName?.type === 'maxLength' && 'maximum length exceeded'
                            }
                        />

                        <TextField
                            size='small'
                            variant='outlined'
                            type="password"
                            label='Password'
                            {...register("password", { required: true, minLength: 8, maxLength: 16 })}
                            error={errors.password ? true : false}
                            helperText={
                                errors.password?.type === 'required' && 'this filed is required' ||
                                errors.password?.type === 'minLength' && 'minimum length is not met' ||
                                errors.password?.type === 'maxLength' && 'maximum length exceeded'
                            }
                        />

                        <TextField
                            size='small'
                            variant='outlined'
                            type="text"
                            label='Address'
                            {...register("address", { required: true, minLength: 5 })}
                            error={errors.address ? true : false}
                            helperText={
                                errors.address?.type === 'required' && 'this filed is required' ||
                                errors.address?.type === 'minLength' && 'minimum length is not met'
                            }
                        />

                        <TextField
                            size='small'
                            variant='outlined'
                            type="text"
                            label='Age'
                            {...register("age", { required: true, min: 18, max: 120 })}
                            error={errors.age ? true : false}
                            helperText={
                                errors.age?.type === 'required' && 'this filed is required' ||
                                errors.age?.type === 'min' && 'minimum length is not met' ||
                                errors.age?.type === 'max' && 'maximum length exceeded'
                            }
                        />

                        <TextField
                            size='small'
                            variant='outlined'
                            type="text"
                            label='City'
                            {...register("city", { minLength: 5 })}
                            error={errors.city ? true : false}
                            helperText={
                                errors.city?.type === 'minLength' && 'minimum length is not met'
                            }
                        />

                        <TextField
                            size='small'
                            variant='outlined'
                            type="text"
                            label='Country'
                            {...register("country", { minLength: 5 })}
                            error={errors.country ? true : false}
                            helperText={
                                errors.country?.type === 'minLength' && 'minimum length is not met'
                            }
                        />
                    </Stack>
                    <Divider sx={{ backgroundColor: 'grey', m: 2 }} />
                    <Button type="submit" variant="contained" color="warning" sx={{ backgroundColor: yellow[800] }}>Submit</Button>
                </form>
            </Box>
        </ThemeProvider>
    );
}

export default LoginForm;
