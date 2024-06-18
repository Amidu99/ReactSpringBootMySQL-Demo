import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { EmployeeObject } from "../interfaces/employee";
import "bootstrap/dist/css/bootstrap.min.css";

const Employees = () => {
    const [employees, setEmployees] = useState<EmployeeObject[]>([]);
    const [nextEmployeeCode, setNextEmployeeCode] = useState<string>("");
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeObject>({
        employeeCode: "",
        employeeName: "",
        employeePic: "",
        employeeEmail: ""
    });

    const getAllEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/sqlbe/api/v1/employee/getAll");
            if (response.status === 200) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const getNextCode = async () => {
        try {
            const response = await axios.get("http://localhost:8080/sqlbe/api/v1/employee/getNextCode");
            if (response.status === 200) {
                setNextEmployeeCode(response.data);
            }
        } catch (error) {
            console.error("Error fetching next employee code:", error);
        }
    };

    const saveEmployee = async () => {
        const employeeCode = (document.getElementById("employee_code") as HTMLInputElement).value;
        const employeeName = (document.getElementById("employee_name") as HTMLInputElement).value;
        const employeePic = (document.getElementById("employee_pic") as HTMLInputElement).value;
        const employeeEmail = (document.getElementById("employee_email") as HTMLInputElement).value;

        const employeeObject = {
            employeeCode,
            employeeName,
            employeePic,
            employeeEmail
        };

        const employeeJSON = JSON.stringify(employeeObject);

        try {
            const response = await axios.post("http://localhost:8080/sqlbe/api/v1/employee/save", employeeJSON, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Employee Saved!');
                window.location.reload();
            }
        } catch (error) {
            console.error("Error saving employee:", error);
        }
    };

    const updateEmployee = async () => {
        const employeeCode = (document.getElementById("employee_code") as HTMLInputElement).value;
        const employeeName = (document.getElementById("employee_name") as HTMLInputElement).value;
        const employeePic = (document.getElementById("employee_pic") as HTMLInputElement).value;
        const employeeEmail = (document.getElementById("employee_email") as HTMLInputElement).value;

        const employeeObject = {
            employeeCode,
            employeeName,
            employeePic,
            employeeEmail
        };

        const employeeJSON = JSON.stringify(employeeObject);

        try {
            const response = await axios.put("http://localhost:8080/sqlbe/api/v1/employee/update", employeeJSON, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Employee Updated!');
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const deleteEmployee = async () => {
        const employeeCode = (document.getElementById("employee_code") as HTMLInputElement).value;

        if (!employeeCode || employeeCode==nextEmployeeCode) {
            console.error("Required a valid EmployeeCode for deletion.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/sqlbe/api/v1/employee/delete/${employeeCode}`);
            if (response.status === 200) {
                alert('Employee Deleted!');
                window.location.reload();
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleRowClick = (employee: EmployeeObject) => {
        setSelectedEmployee(employee);
    };

    useEffect(() => {
        getAllEmployees();
        getNextCode();
    }, []);

    return (
        <>
            <div id='employee_page'>
                <h1 className='heading'>Employee Form</h1>
                <form id="employee_form" className="row g-3">
                    <div className="col col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <label htmlFor="employee_code" className="form-label">Employee Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employee_code"
                            value={selectedEmployee.employeeCode || nextEmployeeCode}
                            readOnly
                        />
                    </div>
                    <div className="col col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <label htmlFor="employee_name" className="form-label">Employee Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employee_name"
                            value={selectedEmployee.employeeName}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, employeeName: e.target.value })
                            }
                        />
                    </div>
                    <div className="col col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <label htmlFor="employee_email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="employee_email"
                            value={selectedEmployee.employeeEmail}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, employeeEmail: e.target.value })
                            }
                        />
                    </div>
                    <div className="col col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <label htmlFor="employee_pic" className="form-label">Profile Pic</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employee_pic"
                            value={selectedEmployee.employeePic}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, employeePic: e.target.value })
                            }
                        />
                    </div>
                    <div id="employee_btns" className="mt-3 mb-4">
                        <button type="button" className="btn btn-success" onClick={saveEmployee}>Save</button>
                        <button type="button" className="btn btn-primary" onClick={updateEmployee}>Update</button>
                        <button type="button" className="btn btn-danger" onClick={deleteEmployee}>Delete</button>
                        <button type="button" className="btn btn-warning" onClick={() => window.location.reload()} id='reset'>Reset</button>
                    </div>
                </form>
                <section id="employees_table_section">
                    <div className="col col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <table className="table table-info table-sm table-hover table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">Employee Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Pic</th>
                                <th scope="col">Email</th>
                            </tr>
                            </thead>
                            <tbody id="employees_tbl_body">
                            {employees.map((employee) => (
                                <tr key={employee.employeeCode} onClick={() => handleRowClick(employee)}>
                                    <td>{employee.employeeCode}</td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.employeePic}</td>
                                    <td>{employee.employeeEmail}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <div>
                    <h1 className='heading'>Employees Are Here</h1>
                    {employees.length > 0 ? (
                        <div id='users_section' className='row mb-3'>
                            {employees.map((employee) => (
                                <div key={employee.employeeCode} className='user_preview col-xl-3 col-lg-4 col-md-4 col-sm-6'>
                                    <img src={`src/assets/${employee.employeePic}`} alt={`${employee.employeeName}`} />
                                    <Link to={`/employee/${employee.employeeCode}`}>{employee.employeeName}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"/>
                                        </svg>
                                    </Link>
                                    <h5>{employee.employeeEmail}</h5>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='loading'>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Employees;