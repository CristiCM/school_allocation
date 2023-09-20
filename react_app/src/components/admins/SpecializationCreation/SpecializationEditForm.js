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

    const [schools, setSchools] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [selectedSpecializationId, setSelectedSpecializationId] = useState(null);
    const [spotsAvailable, setSpotsAvailalbe] = useState(0);

    const getSchoolTrackSpecializationQuery = useQuery({
        queryKey: ['schoolTrackSpecData'],
        queryFn: GetSchoolTrackSpecData,
        onSuccess: (data) => {
            setSchools(data.data.data.schools);
            setTracks(data.data.data.tracks);
            setSpecializations(data.data.data.specializations);
        },
        onError: () => {
            toast.error('Error fetching school track specialization data:');
        }
    });

    const getSpecializationQuery = useQuery({
        queryKey: ['specializationData', id],
        queryFn: () => GetSchoolSpecialization(id),
        onSuccess: (response) => {
            setSelectedSchoolId(response.data.data.school_specialization.school_id);
            setSelectedTrackId(response.data.data.school_specialization.track_id);
            setSelectedSpecializationId(response.data.data.school_specialization.specialization_id);
            setSpotsAvailalbe(response.data.data.school_specialization.spots_available);
        },
        onError: () => {
            toast.error('Error fetching the newly-created specialization!');
        }
    });

    const updateSchoolSpecializationMutation = useMutation({
        mutationFn: (credentials) => {
            return UpdateSchoolSpecialization(
                credentials.id,
                credentials.selectedSchoolId,
                credentials.selectedTrackId,
                credentials.selectedSpecializationId,
                credentials.spotsAvailable,
            )
        },
        onSuccess: (response) => {
            toast.success(response.data.status.message);
            if (location.pathname !== '/specialization_creation') {
                navigate("/specialization_index");
            }
        },
        onError: (error) => {
            toast.error(error.data.status.message);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault()
        updateSchoolSpecializationMutation.mutate({
            id,
            selectedSchoolId,
            selectedTrackId,
            selectedSpecializationId,
            spotsAvailable
        });
    }

    return(
        updateSchoolSpecializationMutation.isLoading ?
        <LoadingComp message={"Updating the specialization..."} /> :
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Label>School Edit From</Form.Label>
            <Form.Select
                aria-label='Edit School'
                value={selectedSchoolId || ""}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
            >
                <option value="" disabled>{(schools.find(school => school.id === selectedSchoolId) || {}).name}</option>
                {schools.map(school => (
                    <option key={school.id} value={school.id}>{school.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Select
                aria-label="Edit Track"
                value={selectedTrackId || ""}
                onChange={(e) => setSelectedTrackId(e.target.value)}
            >
                <option value="" disabled>{(tracks.find(track => track.id === selectedTrackId) || {}).name}</option>
                {tracks.map(track => (
                    <option key={track.id} value={track.id}>{track.name}</option>
                ))}
            </Form.Select>
            <br />
            <Form.Select
                aria-label="Edit Specialization"
                value={selectedSpecializationId || ""}
                onChange={(e) => setSelectedSpecializationId(e.target.value)}
            >
                <option value="" disabled>{(specializations.find(specialization => specialization.id === selectedSpecializationId) || {}).name}</option>
                {specializations.map(spec => (
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
            <Button variant="dark" type="submit">
                Update School Specialization
            </Button>
        </Form>
        </>
    );
}

export default SpecializationEditForm;