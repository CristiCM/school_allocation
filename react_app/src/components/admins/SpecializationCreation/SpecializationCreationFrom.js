import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { GetSchoolTrackSpecData } from '../../../services/API/SchoolCreation/GetSchoolTrackSpecData';
import { CreateSchoolSpecialization } from '../../../services/API/SchoolCreation/CreateSchoolSpecialization';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import LoadingComp from '../../shared/LoadingComp';
import { useQueryClient } from '@tanstack/react-query';

function SchoolCreationForm() {
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [selectedSpecializationId, setSelectedSpecializationId] = useState(null);
    const [spotsAvailable, setSpotsAvailalbe] = useState(0);

    const queryClient = useQueryClient();

    const {data: schoolTrackSpecData, isLoading: schoolTrackSpecIsLoading} = useQuery({
        queryKey: ['schoolTrackSpecData'],
        queryFn: GetSchoolTrackSpecData,
        onError: () => {
            toast.error('Error fetching school track specialization data')
        }
    });

    const {mutate: createSchoolSpecializationMutation, isLoading: schoolSpecializationCreationIsLoading} = useMutation({
        mutationFn: (credentials) => {
            return CreateSchoolSpecialization(
                credentials.selectedSchoolId,
                credentials.selectedTrackId,
                credentials.selectedSpecializationId,
                credentials.spotsAvailable
            );
        },
        onSuccess: (response) => {
            toast.success('Specialization created successfully');
            localStorage.setItem('lastCreatedSpec', response.data.school_specialization.id);
            queryClient.invalidateQueries('specializationData');
        },
        onError: (error) => {
            error.response.status === 409 ?
            toast.error("That specialization already exists!") :
            toast.error("There was an error in creating the specialization!");
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        createSchoolSpecializationMutation({
            selectedSchoolId,
            selectedTrackId,
            selectedSpecializationId,
            spotsAvailable
        });
    }

    return(
        schoolTrackSpecIsLoading ?
        <LoadingComp message={"Fetching Data..."} /> :
        <>
        <Form className='schoolCreationFrom' onSubmit={handleSubmit}>
            <Form.Label>School Creation From</Form.Label>
            <Form.Select
                aria-label='Select a School'
                value={selectedSchoolId || ""}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
            >
                <option value="" disabled>Select a School</option>
                {schoolTrackSpecData.data.schools.map(school => (
                    <option key={school.id} value={school.id}>{school.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Select
                aria-label="Select a Track"
                value={selectedTrackId || ""}
                onChange={(e) => setSelectedTrackId(e.target.value)}
            >
                <option value="" disabled>Select a Track</option>
                {schoolTrackSpecData.data.tracks.map(track => (
                    <option key={track.id} value={track.id}>{track.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Select
                aria-label="Select a Specialization"
                value={selectedSpecializationId || ""}
                onChange={(e) => setSelectedSpecializationId(e.target.value)}
            >
                <option value="" disabled>Select a Specialization</option>
                {schoolTrackSpecData.data.specializations.map(spec => (
                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Group>
                <Form.Label>Available Spots</Form.Label>
                <Form.Control
                    type='number'
                    min={0}
                    step={1}
                    value={spotsAvailable}
                    onChange={(e) => setSpotsAvailalbe(e.target.value)}
                />
            </Form.Group>
            <br />
            <Button variant="dark" type="submit" disabled={schoolSpecializationCreationIsLoading}>
                {schoolSpecializationCreationIsLoading ?
                    "Creating...":
                    "Create School Specialization"
                }
            </Button>
        </Form>
        </>
    );
}

export default SchoolCreationForm;