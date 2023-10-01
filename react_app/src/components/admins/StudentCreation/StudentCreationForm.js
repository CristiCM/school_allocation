import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { CreateStudent } from '../../../services/API/StudentCreation/CreateStudent';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';


function StudentCreationForm() {
    const [email, setEmail] = useState("");
    const [admissionAverage, setAdmissionAverage] = useState("");
    const [englishAverage, setEnglishAverage] = useState("");
    const [romanianGrade, setRomanianGrade] = useState("");
    const [mathematicsGrade, setMathematicsGrade] = useState("");
    const [motherTongue, setMotherTongue ] = useState("");
    const [motherTongueGrade, setMotherTongueGrade ] = useState("");
    const [graduationAverage, setGraduationAverage ] = useState("");
    
    const {mutate: createStudent, isLoading: createStudentIsLoading} = useMutation({
        mutationFn: (studentData) => {
            return CreateStudent(studentData)
        },
        onSuccess: () => {
            toast.success("Student created successfully");
        },
        onError: (error) => {
            error.response.status === 400?
            toast.error("Email has already been taken!") :
            toast.error("Error: Creation failed!");
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let studentData = {
            email: email,
            admission_average: admissionAverage,
            en_average: englishAverage,
            ro_grade: romanianGrade,
            mathematics_grade: mathematicsGrade,
            graduation_average: graduationAverage
        };
    
        if (motherTongue !== "") {
            studentData.user.mother_tongue = motherTongue;
        }
    
        if (motherTongueGrade !== "") {
            studentData.user.mother_tongue_grade = motherTongueGrade;
        }

        createStudent(studentData);

        setEmail("");
        setAdmissionAverage("");
        setEnglishAverage("");
        setRomanianGrade("");
        setMathematicsGrade("");
        setMotherTongue("");
        setMotherTongueGrade("");
        setGraduationAverage("");
    }    

    return(
        <div className='studentCreation-EditFrom'>
        <Form className='studentCreationControl' onSubmit={handleSubmit}>
            <Form.Label className='mb-3'><h5>Creation</h5></Form.Label>

            <Form.Label className='inputLable'>Email address</Form.Label>
            <Form.Control
            placeholder='john@doe.com'
            type='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)
            }/>

            <Form.Label className='inputLable'>Admission Average</Form.Label>
            <Form.Control 
                    placeholder='Ex: 8.65'
                    type='number'
                    value={admissionAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setAdmissionAverage(e.target.value)}
                />
   
            <Form.Label className='inputLable'>English Average</Form.Label>
            <Form.Control
                    placeholder='Ex: 8.65'
                    type='number'
                    value={englishAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setEnglishAverage(e.target.value)}
                />
            <Form.Label className='inputLable'>Romanian Average</Form.Label>
            <Form.Control
                    placeholder='Ex: 8.65'
                    type='number'
                    value={romanianGrade}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setRomanianGrade(e.target.value)}
            />

            <Form.Label className='inputLable'>Mathematics Average</Form.Label>
            <Form.Control
                placeholder='Ex: 8.65'
                type='number'
                value={mathematicsGrade}
                min={1.00}
                max={10.00}
                step={0.01}
                required
                onChange={(e) => setMathematicsGrade(e.target.value)}
            />

            <Form.Label className='inputLable'>Mother Tongue</Form.Label>
            <Form.Control
                placeholder='Ex: German'
                type='text'
                value={motherTongue}
                onChange={(e) => setMotherTongue(e.target.value)}
            />

            <Form.Label className='inputLable'>Mother Tongue Grade</Form.Label>
            <Form.Control
                placeholder='Ex: 8.65'
                type='number'
                value={motherTongueGrade}
                min={1.00}
                max={10.00}
                step={0.01}
                onChange={(e) => setMotherTongueGrade(e.target.value)}
            />

            <Form.Label className='inputLable'>Graduation Average</Form.Label>
            <Form.Control
                placeholder='Ex: 8.65'
                type='number'
                value={graduationAverage}
                min={1.00}
                max={10.00}
                step={0.01}
                required
                onChange={(e) => setGraduationAverage(e.target.value)}
            />

            <Button className='mt-4' variant="dark" type="submit" disabled={createStudentIsLoading}>
                {createStudentIsLoading ?
                    "Creating..." :
                    "Create student"}
            </Button>
        </Form>
        </div>
    );
}

export default StudentCreationForm;