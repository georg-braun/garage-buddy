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
import IVehicle from '@/lib/domain/IVehicle';
import { VehicleBuilder } from '@/lib/application/builder/vehicleBuilder';

interface VehicleEditModalProps {
    children: JSX.Element;
    onSubmitted?: (IVehicle) => Promise<void>;
    initialValue?: IVehicle;
}

export default function VehicleEditModal(props: VehicleEditModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialValue = props.initialValue ?? new VehicleBuilder().withName('BMW').withKilometer(2000).build();
    const initialRef = React.useRef(); /* focused element on modal show */

    return (
        <>
            <span onClick={onOpen}>{props.children}</span>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={async (values, actions) => {
                                const vehicle: IVehicle = values as IVehicle;
                                await props.onSubmitted(vehicle);
                                onClose();
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
