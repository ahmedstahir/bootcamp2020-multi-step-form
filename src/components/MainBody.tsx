import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, CircularProgress, Grid } from '@material-ui/core';
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { object, string } from 'yup';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ForwardArrow from '@material-ui/icons/ArrowForward';
import BackArrow from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        
        display: 'flex',
        height: theme.spacing(70),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20),
        borderRadius: theme.spacing(2),
        justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    stepper: {
        backgroundColor: '#ddd'
    }
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

    const personalDetailsValidationSchema = object({
        fullName: string()
            .required("This is a required field"),
        emailAddress: string()
            .email('Invalid email address')
            .required("This is a required field"),
        mobileNumber: string()
            .matches(/(^(03)[0-9]{9}$)/, "Expected Mobile format is 03001234567")
            .required("This is a required field"),
        address: string()
            .required("This is a required field"),
        postCode: string()
            .matches(/(^$)|(^[0-9]{4}$)/, "Valid Post Code has 4 digits")
    });

    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.cardRoot}>
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            agree: false,
                            fullName: '',
                            emailAddress: '',
                            mobileNumber: '',
                            postCode: '',
                            description: '',
                            address: ''
                        }}
                        onSubmit={async (values) => {
                            await sleep(3000);
                            console.log(values);
                        }}
                    >
                        <FormikStep label="Terms & Conditions">
                            <Grid container spacing={3} style={{ width: '100vh' }}>
                                <Grid item xs={12} sm={12}>
                                    <Field
                                        fullWidth
                                        name="termsAndConditions"
                                        component={TextField}
                                        label="Terms and Conditions"
                                        multiline rows={10}
                                        disabled={true}
                                        value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sapien ante. Proin tellus metus, convallis a lectus quis, sodales pharetra magna. Morbi non ornare purus, nec auctor orci. Sed ac semper ipsum. Nulla luctus vel quam a accumsan. Fusce rhoncus et nisl et commodo. Aenean aliquam urna bibendum, pretium leo in, sodales ex. Ut aliquam faucibus dui, eu tincidunt tellus mollis in. Sed consectetur risus id rutrum tempus. In sed nisi viverra, malesuada orci a, imperdiet ipsum. Pellentesque augue justo, elementum non imperdiet at, gravida a nibh. Sed urna sapien, tristique eget rutrum sed, ultrices non orci. Maecenas varius dui ex, sit amet rutrum tellus laoreet porttitor. Morbi interdum sapien ut nibh auctor auctor. Curabitur rutrum ac lacus sit amet maximus. Quisque ac nulla quis lorem pretium egestas eget non lacus.\n\nDuis laoreet tellus elit. Curabitur in pellentesque magna. Phasellus auctor, risus non scelerisque lacinia, libero nulla vulputate felis, non varius nunc urna id tellus. Etiam sapien justo, ullamcorper nec mi eget, aliquet rutrum dui. Maecenas erat augue, tempus vitae est nec, faucibus imperdiet mauris. Ut et pellentesque tortor. Vivamus at diam et turpis porta fermentum. Etiam eget sem sed tortor lacinia sollicitudin vitae sit amet justo. Aenean ornare, nisi id viverra sagittis, diam velit faucibus ante, at suscipit velit nisl in metus. Vestibulum id iaculis arcu. Mauris in sodales eros. Pellentesque ornare sollicitudin tellus, commodo egestas mauris fringilla nec. Nunc purus tellus, dictum vel nunc sit amet, posuere accumsan magna. Fusce eu facilisis justo.\n\nIn eget nunc et elit porta cursus quis ut nunc. Praesent congue in augue molestie aliquet. Integer varius tincidunt blandit. Donec nec risus ac magna posuere finibus. Nunc eu ipsum neque. Aliquam quis congue lorem, et iaculis orci. Donec tellus lacus, accumsan sit amet augue sed, viverra consequat nisi. Duis molestie consequat velit, sit amet rutrum lacus lobortis at. Aenean sodales quis lorem et auctor. Morbi at volutpat leo. Nulla tristique tempus mi, sit amet faucibus nulla ullamcorper ut.\n\nDuis a ante id nisi facilisis vulputate id at erat. Donec nec tortor ut nunc feugiat tempor. Pellentesque sollicitudin tristique eros vel elementum. Vivamus lorem magna, finibus nec eros sed, posuere condimentum ligula. Nullam eget leo quis purus finibus tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus auctor arcu ut blandit sodales. Aliquam orci nulla, sodales a nisl et, volutpat fringilla ipsum. Nullam rhoncus arcu sem, et pharetra urna egestas ut. Nam elementum arcu et interdum volutpat. Suspendisse potenti. Nunc justo libero, bibendum eget bibendum at, feugiat vel risus. Integer nunc orci, interdum eget consequat vel, pretium sed nibh. Praesent interdum dignissim turpis. Cras et scelerisque mi.\n\nDonec auctor vel est sed lacinia. Fusce non enim enim. Duis at justo purus. Cras tempor at nisi et pretium. Proin bibendum aliquam viverra. Morbi eu ligula at mauris mollis mollis sit amet non elit. Donec in lorem nisl."}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Field name="agree" type='checkbox' component={CheckboxWithLabel} Label={{ label: 'I agree to the Terms & Conditions' }}
                                    />
                                </Grid>
                            </Grid>
                        </FormikStep>
                        <FormikStep label="Personal Details" validationSchema={personalDetailsValidationSchema}>
                            <Grid container spacing={3} style={{ width: '100vh' }}>
                                <Grid item xs={12} sm={6}>
                                    <Field fullWidth name="fullName" component={TextField} label="Full Name" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field fullWidth name="emailAddress" component={TextField} label="Email Address" />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Field fullWidth name="address" component={TextField} label="Address" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field fullWidth name="mobileNumber" component={TextField} label="Mobile Number" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field fullWidth name="postCode" component={TextField} label="Post Code" />
                                </Grid>
                            </Grid>
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
    const classes = useStyles();

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
            {({ isSubmitting, values }) => (
                <Form autoComplete="off">
                    <Stepper className={classes.stepper} alternativeLabel activeStep={activeStep}>
                        {arrChildren.map((child, index) => (
                            <Step key={child.props.label} completed={activeStep > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    <Grid container spacing={2} style={{ justifyContent: 'flex-end' }}>
                        {activeStep > 0 ? (
                            <Grid item>
                                <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setActiveStep(s => s - 1)}><BackArrow />Back</Button>
                            </Grid>
                            ) : null
                        }
                        <Grid item>
                            <Button startIcon={isSubmitting ? <CircularProgress size='1rem' /> : <ForwardArrow />} disabled={isSubmitting || !values.agree} variant="contained" color="primary" type="submit">
                                {isSubmitting ? 'Submitting...' : (isLastStep() ? 'Done' : 'Next')}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}