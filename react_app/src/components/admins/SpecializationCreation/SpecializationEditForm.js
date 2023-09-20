import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from "react-router-dom";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetSchoolSpecialization } from "../../../services/API/SchoolCreation/GetSchoolSpecialization";
import { UpdateSchoolSpecialization } from "../../../services/API/SchoolCreation/UpdateSchoolSpecialization";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';

function SpecializationEditForm() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id ? parseInt(params.id) : parseInt(localStorage.getItem('lastCreatedSpec'));

    const [schools, setSchools] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [selectedSpecializationId, setSelectedSpecializationId] = useState(null);
    const [spotsAvailable, setSpotsAvailalbe] = useState(0);

    const schoolTrackSpecializationQuery = useQuery({
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

    const specializationQuery = useQuery({
        queryKey: ['specializationData', id],
        queryFn: () => GetSchoolSpecialization(id),
        onSuccess: (data) => {
            setSelectedSchoolId(data.data.data.school_specialization.school_id);
            setSelectedTrackId(data.data.data.school_specialization.track_id);
            setSelectedSpecializationId(data.data.data.school_specialization.specialization_id);
            setSpotsAvailalbe(data.data.data.school_specialization.spots_available);
        },
        onError: () => {
            toast.error('Error fetching the newly-created specialization!');
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault()
        await UpdateSchoolSpecialization(id, selectedSchoolId, selectedTrackId, selectedSpecializationId, spotsAvailable);
        setSelectedSchoolId(selectedSchoolId);
        setSelectedTrackId(selectedTrackId);
        setSelectedSpecializationId(selectedSpecializationId);
        setSpotsAvailalbe(spotsAvailable);
        navigate("/specialization_index");
    }

    return(
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