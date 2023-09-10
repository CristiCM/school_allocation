import Accordion from 'react-bootstrap/Accordion';

function StudentHomeAccordion() {
  return (
    <>
        <div className='infoHeaderGeneral'>
            <h3>HOW TO</h3>
            <p>A quick step by step description of the process</p>
        </div>
            
        <div className='accordionGeneral'>
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Step 1: Assess your grades</Accordion.Header>
                <Accordion.Body>
                    You can view your admission results as well as any preferences you may have picked under the "Grades and preferences" section.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Step 2: Pick the schools that best fit your future plan</Accordion.Header>
                <Accordion.Body>
                    Under the 'Choose school preferences' tab, you can select the specializations and schools you want to attend. 
                    You can choose as many as you like, but make sure the priority order is precisely how you want it to be.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Step 3: General check</Accordion.Header>
                <Accordion.Body>
                    Verify everything to make sure your data is accurate.
                    Your grades and the choices you've chosen.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Final notes: What else do i need to know?</Accordion.Header>
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
                    Once you've made your selections and verified that everything is accurate, you can sit back and wait for the allocation date. 
                    Once the school repartition is finished, you will receive an email notification.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
    </>
  );
}

export default StudentHomeAccordion;