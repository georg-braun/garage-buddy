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
    ModalFooter,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Form, Field, Formik } from 'formik';
import React from 'react';

import { useAuth } from '@/lib/auth';
import IVehicle from '@/lib/vehicle/IVehicle';
import { createVehicle } from '@/lib/db';

interface AddVehicleModalProps {
    onSubmitted?: () => Promise<void>;
}

export default function AddVehicleModal(props: AddVehicleModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(); /* focused element on modal show */

    const auth = useAuth();

    async function addVehicle(vehicle: IVehicle) {
        const userId = auth.user.uid;
        if (!userId) {
            console.log('couldnt add vehicle because of empty user id');
        }

        vehicle.userId = userId;

        await createVehicle(vehicle);
    }

    return (
        <>
            <Button onClick={onOpen}>Neues Fahrzeug</Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{ name: 'BMW', kilometer: 30000 }}
                            onSubmit={async (values, actions) => {
                                const vehicle: IVehicle = values as IVehicle;
                                addVehicle(vehicle);
                                onClose();
                                await props.onSubmitted();
                                /*
                                setTimeout(() => {
                                    
                                    alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(true);
                                }, 1000);
                                */
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name="name">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="name">Fahrzeug</FormLabel>
                                                <Input {...field} id="name" placeholder="name" />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="kilometer">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="kilometer">Kilometer</FormLabel>
                                                <Input {...field} id="kilometer" placeholder="kilometer" />
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
