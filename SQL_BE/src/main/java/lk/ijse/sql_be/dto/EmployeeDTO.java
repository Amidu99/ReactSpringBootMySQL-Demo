package lk.ijse.sql_be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDTO implements SuperDTO {
    private String employeeCode;
    private String employeeName;
    private String employeeEmail;
    private String employeePic;
}