package lk.ijse.sql_be.controller;

import lk.ijse.sql_be.dto.EmployeeDTO;
import lk.ijse.sql_be.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/v1/employee")
@RequiredArgsConstructor
public class Employee {
    final static Logger logger = LoggerFactory.getLogger(Employee.class);
    private final EmployeeService employeeService;

    @GetMapping("/health")
    public String healthTest(){
        logger.info("Employee Health Test Passed.");
        return "Employee Health Test Passed.";
    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            validateEmployee(employeeDTO);
            if (employeeService.existsByEmployeeCode(employeeDTO.getEmployeeCode())) {
                logger.info("Exists Employee.");
                return ResponseEntity.badRequest().body("This employee already exists.");
            }
            employeeService.saveEmployee(employeeDTO);
            logger.info(employeeDTO.getEmployeeCode()+" : Employee saved.");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private void validateEmployee(EmployeeDTO employeeDTO) {
        if (!Pattern.compile("^[E]-\\d{4}$").matcher(employeeDTO.getEmployeeCode()).matches()) {
            throw new RuntimeException("Invalid Employee Code.");
        }
        if (!Pattern.compile("^[A-Za-z\\s]{3,}$").matcher(employeeDTO.getEmployeeName()).matches()) {
            throw new RuntimeException("Invalid Employee Name.");
        }
        logger.info("Employee validated.");
    }
}