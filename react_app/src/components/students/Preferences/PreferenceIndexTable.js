import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSchoolTrackSpecData } from "../../../services/API/SchoolCreation/GetSchoolTrackSpecData";
import { GetPreferences } from "../../../services/API/Preferences/GetPreferences";
import { GetAllSchoolSpecializations } from "../../../services/API/SchoolCreation/GetAllSchoolSpecializations";
import { toast } from "react-toastify";
import LoadingComp from "../../shared/LoadingComp";
import { DeletePreference } from '../../../services/API/Preferences/DeletePreference';
import { useQueryClient } from '@tanstack/react-query';

function PreferenceIndexTable () {
    const queryClient = useQueryClient();

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

    const {mutate: deletePreference, isLoading: deletePreferenceIsLoading} = useMutation({
        mutationFn: (id) => {
            return DeletePreference(id);
        },
        onSuccess: () => {
            toast.success('Preference deleted successfully');
            queryClient.invalidateQueries('GetPreferences');
        },
        onError: () => {toast.error('Error deleting preference!');},
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

      const handleDelete = (preferenceId) => {
        deletePreference(preferenceId);
      }

    return (
        preferenceDataIsLoading || allSpecializationsDataIsLoading || schoolTrackSpecDataIsLoading ?
        <LoadingComp message={'Fetching data...'} /> :
        <>
          <div className='tableContainer'>
            <table>
              <caption>Your preferences</caption>
              <thead>
                <tr>
                  <th>
                    School
                  </th>
                  <th>
                    Track
                  </th>
                  <th>
                    Specialization
                  </th>
                  <th>
                    Priority
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {preferenceData.data.preferences ?
                  preferenceData.data.preferences.map(preference => (
                    <tr key={preference.id}>
                      <td data-cell="school"> 
                        {fetchSchoolTrackOrSpecializationName(
                            allSpecializationsData.data.school_specializations.find(s => s.id === preference.school_specialization_id).school_id, 'school')}
                      </td>
                      <td data-cell="track">
                        {fetchSchoolTrackOrSpecializationName(
                            allSpecializationsData.data.school_specializations.find(s => s.id === preference.school_specialization_id).track_id, 'track')}
                      </td>
                      <td data-cell="specialization">
                        {fetchSchoolTrackOrSpecializationName(
                            allSpecializationsData.data.school_specializations.find(s => s.id === preference.school_specialization_id).specialization_id, 'specialization')}
                      </td>
                      <td data-cell="priority">{preference.priority}</td>
                      <td data-cell="delete preference">
                        <Button className='tableButton' variant="secondary" size="sm" disabled={deletePreferenceIsLoading} onClick={() => handleDelete(preference.id)}>
                            {deletePreferenceIsLoading ?
                                "Deleting..." :
                                "Delete"}
                        </Button>
                      </td>
                    </tr>
                  )) :
                  null}
              </tbody>
            </table>
          </div>
        </>
      );
};

export default PreferenceIndexTable;