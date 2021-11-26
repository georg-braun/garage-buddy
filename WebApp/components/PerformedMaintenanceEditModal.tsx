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
    Select,
} from '@chakra-ui/react';
import { Form, Field, Formik } from 'formik';
import React, { useState, useEffect } from 'react';

import IVehicle from '@/lib/domain/IVehicle';
import { PerformedMaintenanceBuilder, VehicleBuilder } from '@/lib/application/builder/vehicleBuilder';
import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';
import IPattern from '@/lib/domain/IPattern';

interface VehicleEditModalProps {
    children: JSX.Element;
    onSubmitted?: (IPerformedMaintenance) => Promise<void>;
    initialValue?: IPerformedMaintenance;
    vehicle: IVehicle;
}

export default function PerformedMaintenanceEditModal(props: VehicleEditModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialValue =
        props.initialValue ?? new PerformedMaintenanceBuilder().withDate('2021-11-26').withKilometer(4000).build();
    const initialRef = React.useRef(); /* focused element on modal show */

    return (
        <>
            <span onClick={onOpen}>{props.children}</span>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Erledigte Inspektion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={async (values, actions) => {
                                const maintenance: IPerformedMaintenance = values as IPerformedMaintenance;
                                await props.onSubmitted(maintenance);

                                onClose();
                            }}
                        >
                            {(formProps) => (
                                <Form>
                                    <Field name="patternId">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="patternId">Inspektion</FormLabel>
                                              <Select source>
                                                    {props.vehicle.patterns.map((_) => (
                                                        <option key={_.id} value={_.id}>
                                                            {_.name} {_.id}
                                                        </option>
                                                    ))}
                                                </Select>
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="date">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="date">Datum</FormLabel>
                                                <Input {...field} id="date" type="date" placeholder="date" />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="kilometer">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel htmlFor="kilometer">Kilometer</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="kilometer"
                                                    type="number"
                                                    placeholder="kilometer"
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
