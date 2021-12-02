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

interface FormFields {
    patternId: string;
    kilometer: number;
    date: string;
}

export default function PerformedMaintenanceEditModal(props: VehicleEditModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [patternIdSelection, setPatternIdSelection] = useState('0');

    const initialValue: FormFields = {
        patternId: props.initialValue?.patternId ?? '0',
        kilometer: props.initialValue?.kilometer ?? 0,
        date: props.initialValue?.date.toISOString().slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    };

    const initialRef = React.useRef(); /* focused element on modal show */

    function handlePatternIdChange(event) {
        setPatternIdSelection(event.target.value);
    }

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
                                // selections are handled different => use extra value
                                const formDate = new Date(values.date);
                                const formKilometer = values.kilometer;
                                const maintenance: IPerformedMaintenance = {
                                    patternId: patternIdSelection,
                                    date: formDate,
                                    kilometer: formKilometer,
                                } as IPerformedMaintenance;
                                await props.onSubmitted(maintenance);

                                onClose();
                            }}
                        >
                            {(formProps) => (
                                <Form>
                                    <Field name="patternId">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <Select
                                                    value={patternIdSelection}
                                                    onChange={handlePatternIdChange}
                                                    multiple={false}
                                                >
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
