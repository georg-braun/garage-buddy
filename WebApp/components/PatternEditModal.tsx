import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    FormControl,
    ModalHeader,
    ModalCloseButton,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Form, Field, Formik } from 'formik';
import React from 'react';

import IPattern from '@/lib/domain/IPattern';

interface VehicleEditModalProps {
    children: JSX.Element;
    onSubmitted?: (IPattern) => Promise<void>;
    initialValue?: IPattern;
}

interface FormFields {
    id: string;
    name: string;
    kilometerInterval: number;
    timeIntervalInDays: number;
}

export default function PatternEditModal(props: VehicleEditModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialValue: FormFields = {
        id: props.initialValue?.id ?? '0',
        name: props.initialValue?.name ?? 'Ölwechsel',
        kilometerInterval: props.initialValue?.kilometerInterval ?? 5000,
        timeIntervalInDays: props.initialValue?.timeIntervalInDays ?? 365,
    };

    const initialRef = React.useRef(); /* focused element on modal show */

    return (
        <>
            <span onClick={onOpen}>{props.children}</span>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Inspektionsmuster</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={async (values) => {
                                const pattern: IPattern = {
                                    ...values,
                                };

                                await props.onSubmitted(pattern);

                                onClose();
                            }}
                        >
                            {() => (
                                <Form>
                                    <Field name="name">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="name">Inspektionsname</FormLabel>
                                                <Input {...field} id="name" type="text" placeholder="name" />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="kilometerInterval">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="kilometerInterval">Kilometer Interval</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="kilometerInterval"
                                                    type="number"
                                                    placeholder="kilometerInterval"
                                                />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="timeIntervalInDays">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="timeIntervalInDays">Zeit Interval</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="timeIntervalInDays"
                                                    type="number"
                                                    placeholder="timeIntervalInDays"
                                                />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button mt={4} colorScheme="teal" type="submit">
                                        Speichern
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
