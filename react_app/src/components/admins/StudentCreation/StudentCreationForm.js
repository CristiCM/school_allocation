import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { CreateStudent } from '../../../services/StudentCreation/CreateStudent';


function StudentCreationForm() {
    const [email, setEmail] = useState(null);
    const [admissionAverage, setAdmissionAverage] = useState(null);
    const [englishAverage, setEnglishAverage] = useState(null);
    const [romanianAverage, setRomanianAverage] = useState(null);
    const [mathematicsGrade, setMathematicsGrade] = useState(null);
    const [motherTongue, setMotherTongue ] = useState(null);
    const [motherTongueGrade, setMotherTongueGrade ] = useState(null);
    const [graduationAverage, setGraduationAverage ] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let studentData = {
            email: email,
            admission_average: admissionAverage,
            en_average: englishAverage,
            ro_grade: romanianAverage,
            mathematics_grade: mathematicsGrade,
            graduation_average: graduationAverage
        };
    
        if (motherTongue) {
            studentData.user.mother_tongue = motherTongue;
        }
    
        if (motherTongueGrade) {
            studentData.user.mother_tongue_grade = motherTongueGrade;
        }

        await CreateStudent(studentData);

        setEmail(null);
        setAdmissionAverage(null);
        setEnglishAverage(null);
        setRomanianAverage(null);
        setMathematicsGrade(null);
        setMotherTongue(null);
        setMotherTongueGrade(null);
        setGraduationAverage(null);
    }    

    return(
        <>
        <Form className='loginform' onSubmit={handleSubmit}>
            <Form.Label>Student Creation Form</Form.Label>
            <Form.Control
            placeholder='Email Adress'
            type='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)
            }/>
            <br />

            <Form.Control
                    placeholder='Admission Average'
                    type='number'
                    value={admissionAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setAdmissionAverage(e.target.value)}
                />
            <br />

            <Form.Control
                    placeholder='English Average'
                    type='number'
                    value={englishAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setEnglishAverage(e.target.value)}
                />
            <br />

            <Form.Control
                    placeholder='Romanian Average'
                    type='number'
                    value={romanianAverage}
                    min={1.00}
                    max={10.00}
                    step={0.01}
                    required
                    onChange={(e) => setRomanianAverage(e.target.value)}
                />
            <br />


            <Form.Control
                placeholder='Mathematics Average'
                type='number'
                value={mathematicsGrade}
                min={1.00}
                max={10.00}
                step={0.01}
                required
                onChange={(e) => setMathematicsGrade(e.target.value)}
            />
            <br />


            <Form.Control
                placeholder='Mother Tongue'
                type='text'
                value={motherTongue}
                onChange={(e) => setMotherTongue(e.target.value)}
            />
            <br />


            <Form.Control
                placeholder='Mother Tongue Grade'
                type='number'
                value={motherTongueGrade}
                min={1.00}
                max={10.00}
                step={0.01}
                onChange={(e) => setMotherTongueGrade(e.target.value)}
            />
            <br />


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
            <Button variant="dark" type="submit">
                Create Student
            </Button>
        </Form>
        </>
    );
}

export default StudentCreationForm;