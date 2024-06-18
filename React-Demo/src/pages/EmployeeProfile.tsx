import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { EmployeeObject } from "../interfaces/employee";
const EmployeeProfile = () => {
    const { employeeCode } = useParams();
    const [employee, setEmployee] = useState<EmployeeObject | null>(null);

    const getEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/sqlbe/api/v1/employee/get/${employeeCode}`);
            if (response.status === 200) {
                setEmployee(response.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getEmployee();
    }, [employeeCode]);

    return (
        <div id='user_profile'>
            {employee ? (
                <>
                    <h1 className='heading'>{employee.employeeName}'s Profile is Here</h1>
                    <img src={`/src/assets/${employee.employeePic}`} alt={`${employee.employeeName}`} />
                    <div>
                        <h5>- Employee Code : <span>{employee.employeeCode}</span></h5>
                        <h5>- Employee Name : <span>{employee.employeeName}</span></h5>
                        <h5>- Employee Email : <span>{employee.employeeEmail}</span></h5>
                    </div>
                </>
            ) : (
                <p className='loading'>Loading...</p>
            )}
        </div>
    );
};

export default EmployeeProfile;