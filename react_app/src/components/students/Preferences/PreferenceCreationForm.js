import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetPreferences } from "../../../services/API/Preferences/GetPreferences";
import { GetAllSchoolSpecializations } from "../../../services/API/SchoolCreation/GetAllSchoolSpecializations";
import { toast } from "react-toastify";
import LoadingComp from "../../shared/LoadingComp";
import { useState } from 'react';
import { CreatePreference } from '../../../services/API/Preferences/CreatePreference';
import { useQueryClient } from '@tanstack/react-query';

function PreferenceCreationForm () {
    const queryClient = useQueryClient();

    const [selectedPreference, setSelectedPreference] = useState('');

    const {data: schoolTrackSpecData, isLoading: schoolTrackSpecDataIsLoading} = useQuery({
        queryKey: ['schoolTrackSpecData'],
        queryFn: GetSchoolTrackSpecData,
        onError: () => {
            toast.error('Error fetching the school, track, specialization data!');
        },
    });

    const {data: preferenceData, isLoading: preferenceDataIsLoading} = useQuery({
        queryKey: ['GetPreferences'],
        queryFn: GetPreferences,
        onError: () => { toast.error('Error fetching the preference data!');},
    });

    const {data: allSpecializationsData, isLoading: allSpecializationsDataIsLoading} = useQuery({
        queryKey: ['schoolSpecializationData'],
        queryFn: GetAllSchoolSpecializations,
        onError: () => {
            toast.error('Error fetching the school specialization data!');
        },
    });

    const {mutate: addPreference, isLoading: addPreferenceIsLoading} = useMutation({
        mutationFn: ({school_spec_id, priority}) => {
            return CreatePreference(school_spec_id, priority);
        },
        onSuccess: () => {
            toast.success('Preference added successfully');
            queryClient.invalidateQueries('GetPreferences');
        },
        onError: () => {
            toast.error('You already have that preference selected!');
        },
    });

    const fetchSchoolTrackOrSpecializationName = (id, type) => {
        if (type === "school") {
            const school = schoolTrackSpecData.data.schools.find(s => s.id === id);
            return school ? school.name : '';
        } else if (type === "track") {
            const track = schoolTrackSpecData.data.tracks.find(t => t.id === id);
            return track ? track.name : '';
        } else if (type === "specialization") {
            const specialization = schoolTrackSpecData.data.specializations.find(s => s.id === id);
            return specialization ? specialization.name : '';
        };
      }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const lastPriority = preferenceData.data.preferences[preferenceData.data.preferences.length - 1].priority;
        const priority = lastPriority + 1;


        addPreference({ school_spec_id: selectedPreference, priority });

    }

    return (
        preferenceDataIsLoading || allSpecializationsDataIsLoading || schoolTrackSpecDataIsLoading ?
        <LoadingComp message={'Fetching data...'} /> :
        <div className='studentPreferenceForm'>
            <Form className='studentPreferenceFormControl' onSubmit={handleSubmit}>
                <Form.Label><h5>Preference Picker</h5></Form.Label>
                <Form.Select
                    aria-label='Select a Preference'
                    value={selectedPreference || ""}
                    onChange={(e) => setSelectedPreference(e.target.value)}
                >
                    <option value="" disabled>Select a preference</option>
                    {allSpecializationsData.data.school_specializations.map(specialization => (
                        <option key={specialization.id} value={specialization.id}>
                            {
                                `${fetchSchoolTrackOrSpecializationName(specialization.school_id, 'school')}   
                                 ${fetchSchoolTrackOrSpecializationName(specialization.track_id, 'track')}   
                                 ${fetchSchoolTrackOrSpecializationName(specialization.specialization_id, 'specialization')}
                                ` 
                            }
                        </option>
                    ))}
                    {schoolTrackSpecData.data.schools.map(school => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                    ))}
                </Form.Select>
                <br/>
                <Button variant="dark" type="submit" disabled={allSpecializationsDataIsLoading} >
                    {allSpecializationsDataIsLoading ?
                        "Adding..." :
                        "Add preference"}           
                </Button>
            </Form>
        </div>
    );
};

export default PreferenceCreationForm;