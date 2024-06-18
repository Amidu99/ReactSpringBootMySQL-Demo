package lk.ijse.sql_be.util;

import lk.ijse.sql_be.dto.EmployeeDTO;
import lk.ijse.sql_be.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Mapping {
    private final ModelMapper mapper;

    // Employee Mapping
    public EmployeeDTO toEmployeeDTO(Employee employee) {
        return  mapper.map(employee, EmployeeDTO.class);
    }
    public Employee toEmployeeEntity(EmployeeDTO employeeDTO) {
        return  mapper.map(employeeDTO, Employee.class);
    }
    public List<EmployeeDTO> toEmployeeDTOList(List<Employee> employees) {
        return mapper.map(employees, List.class);
    }
}