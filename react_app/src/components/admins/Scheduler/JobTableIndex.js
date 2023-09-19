import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { GetJobs } from '../../../services/API/Scheduler/GetJobs';
import { DeleteJob } from '../../../services/API/Scheduler/DeleteJob';
import { ResetAllocation } from '../../../services/API/AllocationReset/ResetAllocation';

function JobTableIndex() {

    const [firstNotificationTime, setFirstNotificationTime] = useState('');
    const [secondNotificationTime, setSecondNotificationTime] = useState('');
    const [allocationTime, setAllocationTime] = useState('');
    const [allocationDone, setAllocationDone] = useState(false);

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

    const handleDelete = async (type) => {

        await DeleteJob(type)
    };

    const handleReset = async() => {
        if (window.confirm("Are you sure you want to reset allocation?")) {
            await ResetAllocation();
        };
    };

    return(
        <>
            <div className="tableGeneral">
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>First notification date</th>
                    <th>Second notification date</th>
                    <th>Allocation date</th>
                    <th>Allocation status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{firstNotificationTime ? firstNotificationTime : "N/A"}</td>
                        <td>{secondNotificationTime ? secondNotificationTime : "N/A"}</td>
                        <td>{allocationTime ? allocationTime : "N/A"}</td>
                        <td>{allocationDone ? "Done" : "Not done"}</td>
                    </tr>
                    <tr>
                        <td>
                        <Button variant="secondary" size="sm" onClick={() => handleDelete("first_notification")}>Delete</Button>
                        </td>
                        <td>
                        <Button variant="secondary" size="sm" onClick={() => handleDelete("second_notification")}>Delete</Button>
                        </td>
                        <td>
                        <Button variant="secondary" size="sm" onClick={() => handleDelete("allocation_date")}>Delete</Button>
                        </td>
                        <td>
                        <Button variant="danger" size="sm" onClick={() => handleReset()}>Reset Allocation</Button>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>
        </>
    );
}

export default JobTableIndex;