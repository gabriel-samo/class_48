import { SubmitHandler, useForm } from 'react-hook-form';
import "./LoginForm.css";
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';

type formInputs = {
    userName: String
    password: String
    address: String
    age: number
    city: String
    country: String
}

function LoginForm(): JSX.Element {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<formInputs>();

    const onSubmit: SubmitHandler<formInputs> = (data) => {
        console.log(data);
        reset();
    }

    return (
        <div className="LoginForm">
            <Typography variant='h4' component={'h4'}>Login Form</Typography>
            <hr />
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <TextField
                    InputLabelProps={{ sx: { color: 'white' } }}
                    InputProps={{
                        sx: {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.5) !important',
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: ""
                            }
                        }
                    }}
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

                <TextField variant='outlined' type="password" label='Password' {...register("password", { required: true, minLength: 8, maxLength: 16 })}
                    error={errors.password ? true : false}
                    helperText={
                        errors.password?.type === 'required' && 'this filed is required' ||
                        errors.password?.type === 'minLength' && 'minimum length is not met' ||
                        errors.password?.type === 'maxLength' && 'maximum length exceeded'
                    }
                />

                <TextField variant='outlined' type="text" label='Address' {...register("address", { required: true, minLength: 5 })}
                    error={errors.address ? true : false}
                    helperText={
                        errors.address?.type === 'required' && 'this filed is required' ||
                        errors.address?.type === 'minLength' && 'minimum length is not met'
                    }
                />

                <TextField variant='outlined' type="text" label='Age' {...register("age", { required: true, min: 18, max: 120 })}
                    error={errors.age ? true : false}
                    helperText={
                        errors.age?.type === 'required' && 'this filed is required' ||
                        errors.age?.type === 'min' && 'minimum length is not met' ||
                        errors.age?.type === 'max' && 'maximum length exceeded'
                    }
                />

                <input type="text" placeholder='City' {...register("city", { minLength: 5 })} />
                {errors.city?.type === 'minLength' && <span className='errorLog'>minimum length is not met</span>}

                <input type="text" placeholder='Country' {...register("country", { minLength: 5 })} />
                {errors.country?.type === 'minLength' && <span className='errorLog'>minimum length is not met</span>}

                <input type="submit" value='Submit' />
            </Box>
        </div>
    );
}

export default LoginForm;
