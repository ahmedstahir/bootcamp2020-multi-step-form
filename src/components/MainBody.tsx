import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, CircularProgress } from '@material-ui/core';
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { object, mixed, number } from 'yup';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        
        display: 'flex',
        height: theme.spacing(60),
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20),
        borderRadius: theme.spacing(2),
        justifyContent: 'center'
        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            //main: '#3F704D',
            main: '#085373',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
            contrastText: '#ddd',
        },
        secondary: {
            light: '#7c7c7c',
            main: '#00dc49',
            //color:'#ffffff'
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

const sleep = (delay: number) => new Promise((accept) => setTimeout(accept, delay));

export default function MainBody() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.cardRoot}>
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            agree: false,
                            money: 0,
                            description: ''
                        }}
                        onSubmit={async (values) => {
                            await sleep(3000);
                            console.log('values', values);
                        }}
                    >
                        <FormikStep label="First">
                            <Field fullWidth name="firstName" component={TextField} label="First Name" />
                            <Field fullWidth name="lastName" component={TextField} label="Last Name" />
                            <Field name="agree" type='checkbox' component={CheckboxWithLabel} Label={{ label: 'I agree to the Terms & Conditions' }} />
                        </FormikStep>
                        <FormikStep label="Second"
                            validationSchema={object({
                                money: mixed().when('agree', {
                                    is: true,
                                    then: number().required().min(1_000_000, 'Expected value: more than a million'),
                                    otherwise: number().required()
                                })
                            })}
                        >
                            <Field fullWidth name="money" component={TextField} label="Bank Balance" />
                        </FormikStep>
                        <FormikStep label="Third">
                            <Field fullWidth name="description" component={TextField} label="Description" />
                        </FormikStep>
                    </FormikStepper>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const arrChildren = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [activeStep, setActiveStep] = useState(0);
    const currentChild = arrChildren[activeStep];
    const [completed, setCompleted] = useState(false);

    function isLastStep() {
        return activeStep === arrChildren.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                    setCompleted(true);
                } else {
                    setActiveStep(s => s + 1);
                }
            }}
        >
            {({isSubmitting}) => (
                <Form autoComplete="off">
                    <Stepper alternativeLabel activeStep={activeStep}>
                        {arrChildren.map((child, index) => (
                            <Step key={child.props.label} completed={activeStep > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    {activeStep > 0
                        ? <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setActiveStep(s => s - 1)}>Back</Button>
                        : null
                    }
                    <Button startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null} disabled={isSubmitting} variant="contained" color="primary" type="submit">
                        {isSubmitting ? 'Submitting...' : (isLastStep() ? 'Done' : 'Next')}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}