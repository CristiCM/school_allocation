import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from "react-router-dom";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetSchoolSpecialization } from "../../../services/API/SchoolCreation/GetSchoolSpecialization";
import { UpdateSchoolSpecialization } from "../../../services/API/SchoolCreation/UpdateSchoolSpecialization";


function SpecializationEditForm() {
    const {id} = useParams();
    const [schools, setSchools] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [selectedSpecializationId, setSelectedSpecializationId] = useState(null);
    const [spotsAvailable, setSpotsAvailalbe] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            
            const specData = await GetSchoolSpecialization(id);
            setSelectedSchoolId(specData.school_id);
            setSelectedTrackId(specData.track_id);
            setSelectedSpecializationId(specData.specialization_id);
            setSpotsAvailalbe(specData.spots_available);

            const data = await GetSchoolTrackSpecData();
            setSchools(data.schools);
            setTracks(data.tracks);
            setSpecializations(data.specializations);
        };
    
        fetchData();
    }, []);
    

    const handleSubmit = async (event) => {
        event.preventDefault()
        await UpdateSchoolSpecialization(id, selectedSchoolId, selectedTrackId, selectedSpecializationId, spotsAvailable);
        setSelectedSchoolId(selectedSchoolId);
        setSelectedTrackId(selectedTrackId);
        setSelectedSpecializationId(selectedSpecializationId);
        setSpotsAvailalbe(spotsAvailable);
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