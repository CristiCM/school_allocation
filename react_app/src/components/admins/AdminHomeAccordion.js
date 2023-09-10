import Accordion from 'react-bootstrap/Accordion';

function AdminHomeAccordion() {
  return (
    <>
        <div className='infoHeaderGeneral'>
            <h3>HOW TO</h3>
            <p>A quick step by step description of the process</p>
        </div>
            
        <div className='accordionGeneral'>
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Step 1: Importing the necessary data</Accordion.Header>
                <Accordion.Body>
                    Data must be loaded in.csv format under the "Import Data" tab.
                    The document must contain three columns with the following headings:
                    |school|track|specialization|
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Step 2: Createing school specializations</Accordion.Header>
                <Accordion.Body>
                    Under the "Specialization Creation" page, school specialties must be created.
                    School, Track, Specialization, and Capacity input are all available on the form. 
                    In case any errors managed to slip in, there is also a "Last entry" form that enables quick corrections.
                    Additionally, there is a button labeled "All records" that will show every record previously generated with the option to modify it.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Step 3: Creating student accounts</Accordion.Header>
                <Accordion.Body>
                    A plug-and-play student account can be created under the "Student Creation" section. 
                    Administrators can enter the student's grades on the form, and after it's submitted, 
                    the student will receive an email asking him to reset his password. 
                    He is able to select his preferences from the ones that were generated in the previous phase.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Step 4: Picking notification and allocation dates</Accordion.Header>
                <Accordion.Body>
                    There are two potential notification dates that can be selected in the "Scheduler" section. 
                    The pupils who didn't select any preferences will be reminded through email to do so at the appropriate time by using the notification date pickers.
                    The allocation date picker enables the selection of a day for the allocation procedure, 
                    on which each student will be assigned to one of the open slots they selected.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Step 5: Overview</Accordion.Header>
                <Accordion.Body>
                    A post-allocation overall view of the pupils is possible in the "Allocation Overview" section.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
    </>
  );
}

export default AdminHomeAccordion;