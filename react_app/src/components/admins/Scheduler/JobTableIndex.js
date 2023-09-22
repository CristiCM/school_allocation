import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { GetJobs } from '../../../services/API/Scheduler/GetJobs';
import { DeleteJob } from '../../../services/API/Scheduler/DeleteJob';
import { ResetAllocation } from '../../../services/API/AllocationReset/ResetAllocation';
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import LoadingComp from '../../shared/LoadingComp';
function JobTableIndex() {
    const queryClient = useQueryClient();

    const {data: jobsData, isLoading: jobsDataIsLoading} = useQuery({
        queryKey: ['jobsData'],
        queryFn: GetJobs,
        onError: () => {
            toast.error('Error fetching the jobs data!')
        },
    });

    const {mutate: deleteJob, isLoading: deleteJobIsLoading} = useMutation({
        mutationFn: (type) => {
            return DeleteJob(type);
        },
        onSuccess: () =>{
            toast.success('Job deleted successfully');
            queryClient.invalidateQueries(['jobsData']);
        },
        onError: () => {
            toast.error('Failed: There was an error deleting the job!')
        },
    });

    const {mutate: resetAllocation, isLoading: resetAllocationIsLoading} = useMutation({
        mutationFn: () => {return ResetAllocation();},
        onSuccess: () => {
            toast.success('Allocation reseted successfully');
            queryClient.invalidateQueries('jobsData');
        },
        onError: () => {
            toast.error('There was an error reseting the allocation!')
        },
    });

    const handleDelete = async (type) => {
        deleteJob(type);
    };

    const handleReset = async() => {
        if (window.confirm("Are you sure you want to reset allocation?")) {
            resetAllocation();
        };
    };

    const formatDate = dateString => {
        const [date, time] = dateString.split('T');
        const simplifiedTime = time.substring(0, 8);
        return `${date} ${simplifiedTime}`;
      };

    return(
        jobsDataIsLoading ?
        <LoadingComp message={'Fetching data...'} /> :
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
                        <td>{jobsData.data.job.first_notification_time ? 
                            formatDate(jobsData.data.job.first_notification_time) : 
                            "N/A"}</td>
                        <td>{jobsData.data.job.second_notification_time ? 
                            formatDate(jobsData.data.job.second_notification_time) : 
                            "N/A"}</td>
                        <td>{jobsData.data.job.allocation_time ? 
                            formatDate(jobsData.data.job.allocation_time) : 
                            "N/A"}</td>
                        <td>{jobsData.data.job.allocation_done ? 
                            "Done" : 
                            "Not done"}</td>
                    </tr>
                    <tr>
                        <td>
                        <Button variant="secondary" size="sm" disabled={deleteJobIsLoading} onClick={() => handleDelete("first_notification")}>
                            {deleteJobIsLoading ?
                                "Deleting...":
                                "Delete"}
                        </Button>
                        </td>
                        <td>
                        <Button variant="secondary" size="sm" onClick={() => handleDelete("second_notification")}>
                            {deleteJobIsLoading ?
                                    "Deleting...":
                                    "Delete"}
                        </Button>
                        </td>
                        <td>
                        <Button variant="secondary" size="sm" onClick={() => handleDelete("allocation_date")}>
                            {deleteJobIsLoading ?
                                    "Deleting...":
                                    "Delete"}
                        </Button>
                        </td>
                        <td>
                        <Button variant="danger" size="sm" disabled={resetAllocationIsLoading} onClick={() => handleReset()}>
                            {resetAllocationIsLoading ?
                                "Reseting..." :
                                "Reset Allocation"}
                        </Button>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>
        </>
    );
}

export default JobTableIndex;