import { Form, Field, Formik } from 'formik';
import { Input, Button } from '@chakra-ui/react';
import IPattern from '@/lib/domain/IPattern';

interface IPatternListEntryProps {
    pattern: IPattern;
    submitText?: string;
    onSubmit: (pattern: IPattern) => Promise<void>;
}

export default function PatternListEntry(props: IPatternListEntryProps): JSX.Element {
    function validateName(value) {
        if (!value) console.log('Ein Inspektionsname ist notwendig');
    }

    function validateKilometerInterval(value) {
        if (!value) console.log('Ein Kilometer Intervall ist notwendig');
    }

    function validateTimeInterval(value) {
        if (!value) console.log('Ein Zeit Intervall ist notwendig');
    }

    return (
        <div>
            <Formik
                initialValues={props.pattern}
                onSubmit={async (values, actions) => {
                    const pattern: IPattern = values as IPattern;
                    await props.onSubmit(pattern);
                    actions.setSubmitting(false);
                }}
            >
                {(formikProps) => (
                    <Form>
                        <Field name="name" validate={validateName}>
                            {({ field }) => <Input {...field} id="name" placeholder="name" maxWidth="200" />}
                        </Field>
                        <Field name="kilometerInterval" validate={validateKilometerInterval}>
                            {({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    id="kilometerInterval"
                                    placeholder="Kilometer Interval"
                                    maxWidth="200"
                                />
                            )}
                        </Field>

                        <Field name="timeIntervalInDays" validate={validateTimeInterval}>
                            {({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    id="timeIntervalInDays"
                                    placeholder="timeIntervalInDays"
                                    maxWidth="200"
                                />
                            )}
                        </Field>
                        <Button colorScheme="teal" isLoading={formikProps.isSubmitting} type="submit">
                            {props.submitText}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
