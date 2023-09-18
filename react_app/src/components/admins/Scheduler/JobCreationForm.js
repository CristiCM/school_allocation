import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { GetJobs } from '../../../services/API/Scheduler/GetJobs';
import { CreateJob } from '../../../services/API/Scheduler/CreateJob';


function JobCreationForm() {
    const JOB_TYPES = Object.freeze(["First Notification", "Second Notification", "Allocation Date"]);
    const [, setFirstNotificationTime] = useState('');
    const [, setSecondNotificationTime] = useState('');
    const [, setAllocationTime] = useState('');
    const [, setAllocationDone] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const fetchJobs = async() => {
        const data = await GetJobs();

        setFirstNotificationTime(data.first_notification_time);
        setSecondNotificationTime(data.second_notification_time);
        setAllocationTime(data.allocation_time);
        setAllocationDone(data.allocation_done)
    };

    useEffect(() => {
        const fetchData = async () => {
          await fetchJobs();
        };
    
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const type = selectedJob === "First Notification" ?
        "first_notification" :
        selectedJob === "Second Notification" ?
        "second_notification" :
        "allocation_date";

        const selectedTime = `${date} ${time}`;

        await CreateJob(type, selectedTime);
        await fetchJobs();

        setSelectedJob('');
        setDate('');
        setTime('');
    }    

    return(
        <>
            <Form className='studentform' onSubmit={handleSubmit}>

                <Form.Label>Scheduler Form</Form.Label>
                <Form.Select
                    value={selectedJob || ""}
                    onChange={(e) => setSelectedJob(e.target.value)}
                >
                    <option value="" disabled>Select a scheduling type.</option>
                    {JOB_TYPES.map(job => (
                        <option>{job}</option>
                    ))}
                </Form.Select>
                
                <br />

                <Form.Control 
                type='date' 
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                />
                <br />
                <Form.Control 
                type='time'
                value={time || ""}
                onChange={(e) => setTime(e.target.value)}
                />
                
                <br />
                <Button variant="dark" type="submit">
                    Schedule action
                </Button>
            </Form>
        </>
    );
}

export default JobCreationForm;