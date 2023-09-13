import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { GetSchoolTrackSpecData } from '../../../services/API/SchoolCreation/GetSchoolTrackSpecData';
import { CreateSchoolSpecialization } from '../../../services/API/SchoolCreation/CreateSchoolSpecialization';


function SchoolCreationForm() {
    const [schools, setSchools] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [selectedSpecializationId, setSelectedSpecializationId] = useState(null);
    const [spotsAvailable, setSpotsAvailalbe] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetSchoolTrackSpecData();
            setSchools(data.schools);
            setTracks(data.tracks);
            setSpecializations(data.specializations);
        };
    
        fetchData();
    }, []);
    

    const handleSubmit = async (event) => {
        event.preventDefault()
        await CreateSchoolSpecialization(selectedSchoolId, selectedTrackId, selectedSpecializationId, spotsAvailable);
        setSelectedSchoolId(null);
        setSelectedTrackId(null);
        setSelectedSpecializationId(null);
        setSpotsAvailalbe(0);
    }

    return(
        <>
        <Form className='schoolCreationFrom' onSubmit={handleSubmit}>
            <Form.Label>School Creation From</Form.Label>
            <Form.Select
                aria-label='Select a School'
                value={selectedSchoolId || ""}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
            >
                <option value="" disabled>Select a School</option>
                {schools.map(school => (
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
                {tracks.map(track => (
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
                Create School Specialization
            </Button>
        </Form>
        </>
    );
}

export default SchoolCreationForm;