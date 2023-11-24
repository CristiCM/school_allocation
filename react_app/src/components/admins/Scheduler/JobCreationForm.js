import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { GetJobs } from '../../../services/API/Scheduler/GetJobs';
import { CreateJob } from '../../../services/API/Scheduler/CreateJob';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import LoadingComp from '../../shared/LoadingComp';

function JobCreationForm() {
    const queryClient = useQueryClient();
    const JOB_TYPES = Object.freeze(["First Notification", "Second Notification", "Allocation Date"]);
    const [selectedJob, setSelectedJob] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const {isLoading: jobsDataIsLoading} = useQuery({
        queryKey: ['jobsData'],
        queryFn: GetJobs,
        onError: () => {
            toast.error('Error fetching the jobs data!')
        },
    });

    const {mutate: createJob, isLoading: createJobIsLoading} = useMutation({
        mutationFn: (credentials) => {
            return CreateJob(credentials.type, credentials.selectedTime);
        },
        onSuccess: () => {
            toast.success('Job created successfully');
            queryClient.invalidateQueries(['jobsData']);
        },
        onError: (error) => {
            error.response.status === 422 ?
            toast.error('The allocation is already done!') :
            toast.error('Error: All fields need to be filled!')
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const type = selectedJob === "First Notification" ?
        "first_notification" : selectedJob === "Second Notification" ?
        "second_notification" : "allocation_date";
        const selectedTime = `${date} ${time}`;

        createJob({type, selectedTime});

        setSelectedJob('');
        setDate('');
        setTime('');
    }    

    return(
        jobsDataIsLoading ?
        <LoadingComp message={'Fetching data...'} /> :
        <div className='taskSchedulerForm'>
            <Form className='taskSchedulerFormControl' onSubmit={handleSubmit}>

                <Form.Label><h5>Task Creation</h5></Form.Label>
                <Form.Label className='inputLable'>Type of task</Form.Label>
                <Form.Select
                    value={selectedJob || ""}
                    onChange={(e) => setSelectedJob(e.target.value)}
                >
                    <option value="" disabled>Select a scheduling type.</option>
                    {JOB_TYPES.map(job => (
                        <option>{job}</option>
                    ))}
                </Form.Select>

                <Form.Label className='inputLable'>Date</Form.Label>
                <Form.Control 
                type='date' 
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                />
                <Form.Label className='inputLable'>Time</Form.Label>
                <Form.Control className='mb-3'
                type='time'
                value={time || ""}
                onChange={(e) => setTime(e.target.value)}
                />
                
                <Button className='padding-bottom: 2px' variant="dark" type="submit" disabled={createJobIsLoading}>
                    {createJobIsLoading ? 
                        "Scheduling..." :
                        "Schedule task"}
                </Button>
            </Form>
        </div>
    );
}

export default JobCreationForm;