import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from "react-router-dom";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetSchoolSpecialization } from "../../../services/API/SchoolCreation/GetSchoolSpecialization";
import { UpdateSchoolSpecialization } from "../../../services/API/SchoolCreation/UpdateSchoolSpecialization";
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import LoadingComp from "../../shared/LoadingComp";

function SpecializationEditForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const id = params.id ? parseInt(params.id) : parseInt(localStorage.getItem('lastCreatedSpec'));
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [selectedSpecializationId, setSelectedSpecializationId] = useState(null);
    const [spotsAvailable, setSpotsAvailalbe] = useState(0);

    const {data: schoolTrackSpecData, isLoading: schoolTrackSpecIsLoading} = useQuery({
        queryKey: ['schoolTrackSpecData'],
        queryFn: GetSchoolTrackSpecData,
        onError: () => {
            toast.error('Error fetching school track specialization data')
        }
    });
    
    const {isLoading: newlyCreatedSpecializationIsLoading} = useQuery({
        queryKey: ['specializationData', id],
        queryFn: () => GetSchoolSpecialization(id),
        onSuccess: (response) => {
            setSelectedSchoolId(response.data.school_specialization.school_id);
            setSelectedTrackId(response.data.school_specialization.track_id);
            setSelectedSpecializationId(response.data.school_specialization.specialization_id);
            setSpotsAvailalbe(response.data.school_specialization.spots_available);
        },
        onError: (error) => {
            error.response.status === 404?
            toast.error(`Invalid record id: ${id}!`):
            toast.error('Error fetching the newly-created specialization!');
        }
    });

    const {mutate: updateSchoolSpecializationMutation, isLoading: updateSpecializationIsLoading } = useMutation({
        mutationFn: (credentials) => {
            return UpdateSchoolSpecialization(
                credentials.id,
                credentials.selectedSchoolId,
                credentials.selectedTrackId,
                credentials.selectedSpecializationId,
                credentials.spotsAvailable,
            )
        },
        onSuccess: () => {
            toast.success('Specialization updated successfully');
            if (location.pathname !== '/specialization_creation') navigate("/specialization_index");
        },
        onError: (error) => {
            error.response.status === 404 ?
            toast.error(`Invalid record id: ${id}!`):
            toast.error('Error fetching the newly-created specialization!');
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault()
        updateSchoolSpecializationMutation({
            id,
            selectedSchoolId,
            selectedTrackId,
            selectedSpecializationId,
            spotsAvailable
        });
    }

    return(
        schoolTrackSpecIsLoading ?
        <LoadingComp message={"Fetching Data..."} /> :
        newlyCreatedSpecializationIsLoading ?
        <LoadingComp message={"Fetching Data..."} /> :
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Label>School Edit From</Form.Label>
            <Form.Select
                aria-label='Edit School'
                value={selectedSchoolId || ""}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
            >
                <option value="" disabled>{(schoolTrackSpecData.data.schools.find(school => school.id === selectedSchoolId) || {}).name}</option>
                {schoolTrackSpecData.data.schools.map(school => (
                    <option key={school.id} value={school.id}>{school.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Select
                aria-label="Edit Track"
                value={selectedTrackId || ""}
                onChange={(e) => setSelectedTrackId(e.target.value)}
            >
                <option value="" disabled>{(schoolTrackSpecData.data.tracks.find(track => track.id === selectedTrackId) || {}).name}</option>
                {schoolTrackSpecData.data.tracks.map(track => (
                    <option key={track.id} value={track.id}>{track.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Select
                aria-label="Edit Specialization"
                value={selectedSpecializationId || ""}
                onChange={(e) => setSelectedSpecializationId(e.target.value)}
            >
                <option value="" disabled>{(schoolTrackSpecData.data.specializations.find(specialization => specialization.id === selectedSpecializationId) || {}).name}</option>
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
            <Button variant="dark" type="submit" disabled={updateSpecializationIsLoading}>
                {updateSpecializationIsLoading ?
                    "Updating...":
                    "Update School Specialization"
                }
            </Button>
        </Form>
        </>
    );
}

export default SpecializationEditForm;