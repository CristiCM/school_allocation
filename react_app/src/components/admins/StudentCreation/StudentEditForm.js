import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, useParams } from "react-router-dom";
import { GetStudent } from "../../../services/API/StudentCreation/GetStudent";
import { UpdateStudent } from "../../../services/API/StudentCreation/UpdateStudent";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingComp from "../../shared/LoadingComp";

function StudentEditForm() {
    const navigate = useNavigate();
    const params = useParams();
    const id = parseInt(params.id);

    const [email, setEmail] = useState("");
    const [admissionAverage, setAdmissionAverage] = useState("");
    const [englishAverage, setEnglishAverage] = useState("");
    const [romanianGrade, setRomanianGrade] = useState("");
    const [mathematicsGrade, setMathematicsGrade] = useState("");
    const [motherTongue, setMotherTongue ] = useState("");
    const [motherTongueGrade, setMotherTongueGrade ] = useState("");
    const [graduationAverage, setGraduationAverage ] = useState("");

    const {isLoading: studentDataIsLoading} = useQuery({
        queryKey: ['studentData', id],
        queryFn: () => GetStudent(id),
        onSuccess: (response) => {
            setEmail(response.data.student.email || "");
            setAdmissionAverage(response.data.student.admission_average || "");
            setEnglishAverage(response.data.student.en_average || "");
            setRomanianGrade(response.data.student.ro_grade || "");
            setMathematicsGrade(response.data.student.mathematics_grade || "");
            setMotherTongue(response.data.student.mother_tongue || "");
            setMotherTongueGrade(response.data.student.mother_tongue_grade || "");
            setGraduationAverage(response.data.student.graduation_average || "");
        },
        onError: () => {
            toast.error('Error fetching student data!');
        },
    });

    const {mutate: updateStudent, isLoading: updateStudentIsLoading} = useMutation({
        mutationFn: (updateStudentData) => {
            return UpdateStudent(updateStudentData);
        },
        onSuccess: () => {
            toast.success("Student was updated successfully");
            navigate("/student_index");
        },
        onError: () => { toast.error("Error: Update failed!")},
    });

    const handleSubmit = async (event) => {
        event.preventDefault()

        let updatedStudentData = {
            id: id,
            email: email,
            admission_average: admissionAverage,
            en_average: englishAverage,
            ro_grade: romanianGrade,
            mathematics_grade: mathematicsGrade,
            graduation_average: graduationAverage
        };
    
        if (motherTongue !== "") {
            updatedStudentData.mother_tongue = motherTongue;
        }
    
        if (motherTongueGrade !== "") {
            updatedStudentData.mother_tongue_grade = motherTongueGrade;
        }

        updateStudent(updatedStudentData);
    }

    return(
        studentDataIsLoading ?
        <LoadingComp message={'Fetching data...'} /> :
        <>
        <Form className='studentform' onSubmit={handleSubmit}>
            <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                Edit student: {email}
            </Form.Label>

            <br />
            <Form.Label>Admission average</Form.Label>
            <Form.Control
                    type='number'
                    value={admissionAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setAdmissionAverage(e.target.value)}
                />
            <br />
            <Form.Label>English average</Form.Label>
            <Form.Control
                    type='number'
                    value={englishAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setEnglishAverage(e.target.value)}
                />
            <br />
            <Form.Label>Romanian grade</Form.Label>
            <Form.Control
                    type='number'
                    value={romanianGrade}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setRomanianGrade(e.target.value)}
                />
            <br />
            <Form.Label>Mathematics average</Form.Label>
            <Form.Control
                type='number'
                value={mathematicsGrade}
                min={1.00}
                max={10.00}
                step={0.01}
                required
                onChange={(e) => setMathematicsGrade(e.target.value)}
            />
            <br />

            <Form.Label>Mother tongue</Form.Label>
            <Form.Control
                placeholder="Mother tongue"
                type='text'
                value={motherTongue}
                onChange={(e) => setMotherTongue(e.target.value)}
            />
            <br />

            <Form.Label>Mother tongue grade</Form.Label>
            <Form.Control
                placeholder="Mother Tongue Grade"
                type='number'
                value={motherTongueGrade}
                min={1.00}
                max={10.00}
                step={0.01}
                onChange={(e) => setMotherTongueGrade(e.target.value)}
            />
            <br />

            <Form.Label>Graduation average</Form.Label>
            <Form.Control
                placeholder='Graduation Average'
                type='number'
                value={graduationAverage}
                min={1.00}
                max={10.00}
                step={0.01}
                required
                onChange={(e) => setGraduationAverage(e.target.value)}
            />
            <br />
            <Button variant="dark" type="submit" disabled={updateStudentIsLoading}>
                {updateStudentIsLoading ?
                    "Updating..." :
                    "Update Student"}
            </Button>
        </Form>
        </>
    );
}

export default StudentEditForm;