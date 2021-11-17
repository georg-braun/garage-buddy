import { Form, Field, Formik } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import React from 'react';

export default function PatternList(): JSX.Element {
    function validateName(value) {
        if (!value) return 'Ein Inspektionsname ist notwendig';
    }

    function validateKilometerInterval(value) {
        if (!value) return 'Ein Kilometer Intervall ist notwendig';
    }

    function validateTimeInterval(value) {
        if (!value) return 'Ein Zeit Intervall ist notwendig';
    }

    return (
        <div>
            <Formik
                initialValues={{ id: '0', name: 'Luftfilter', kilometerInterval: 5000, timeIntervalInDays: 365 }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <Form>
                        <Field name="name" validate={validateName}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor="name">Inspektion</FormLabel>
                                    <Input {...field} id="name" placeholder="name" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="kilometerInterval" validate={validateKilometerInterval}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.kilometerInterval && form.touched.kilometerInterval}
                                >
                                    <FormLabel htmlFor="kilometerInterval">Kilometer Interval</FormLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        id="kilometerInterval"
                                        placeholder="Kilometer Interval"
                                    />
                                    <FormErrorMessage>{form.errors.kilometerInterval}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="timeIntervalInDays" validate={validateTimeInterval}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.timeIntervalInDays && form.touched.timeIntervalInDays}
                                >
                                    <FormLabel htmlFor="timeIntervalInDays">Zeit Interval in Tagen</FormLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        id="timeIntervalInDays"
                                        placeholder="timeIntervalInDays"
                                    />
                                    <FormErrorMessage>{form.errors.timeIntervalInDays}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
