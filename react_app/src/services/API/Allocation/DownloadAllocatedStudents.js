import axios from "axios";
import { toast } from "react-toastify";

export const DownloadAllocatedStudents = async (sortBy, order) => {
    const url = 'http://localhost:3000/assignments/download';

    const headers = {
        'Authorization': `${sessionStorage.getItem('jwt')}`
    };

    const params = {
        "sort_by": sortBy,
        "order": order
    };
  
    const response = await axios.get(url, {
        headers: headers,
        params: params,
        responseType: 'blob'
    });

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'AllocatedStudents.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success('File downloaded successfully!')
}
