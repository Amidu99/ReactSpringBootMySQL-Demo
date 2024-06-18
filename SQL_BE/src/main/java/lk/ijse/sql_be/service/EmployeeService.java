package lk.ijse.sql_be.service;

import lk.ijse.sql_be.dto.EmployeeDTO;
import java.util.List;

public interface EmployeeService {
    boolean existsByEmployeeCode(String employeeCode);
    void saveEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO getEmployeeByEmployeeCode(String employeeCode);
    List<EmployeeDTO> getAllEmployees();
    String getLastEmployeeCode();
    void updateEmployee(EmployeeDTO employeeDTO);
    void deleteEmployee(String employeeCode);
}