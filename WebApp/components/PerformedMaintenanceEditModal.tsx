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
    Select,
} from '@chakra-ui/react';
import { Form, Field, Formik } from 'formik';
import React, { useState } from 'react';

import IVehicle from '@/lib/domain/IVehicle';
import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';

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

    const [patternIdSelection, setPatternIdSelection] = useState(props.vehicle.patterns[0].id ?? '0');

    const initialValue: FormFields = {
        patternId: props.initialValue?.patternId ?? '0',
        kilometer: props.initialValue?.kilometer ?? props.vehicle.kilometer ?? 0,
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
                            onSubmit={async (values) => {
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
                            {() => (
                                <Form>
                                    <Field name="patternId">
                                        {({form }) => (
                                            <FormControl>
                                                <Select
                                                    value={patternIdSelection}
                                                    onChange={handlePatternIdChange}
                                                    multiple={false}
                                                >
                                                    {props.vehicle.patterns.map((_) => (
                                                        <option key={_.id} value={_.id}>
                                                            {_.name}
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
