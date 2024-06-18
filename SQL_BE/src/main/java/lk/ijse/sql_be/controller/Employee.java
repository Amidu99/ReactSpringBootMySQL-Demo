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

    @GetMapping("/get/{employeeCode}")
    public ResponseEntity<?> getOneEmployee(@PathVariable String employeeCode){
        boolean isExists = employeeService.existsByEmployeeCode(employeeCode);
        if (!isExists){
            logger.info("Not Exists Employee.");
            return ResponseEntity.noContent().build();
        }
        EmployeeDTO employeeDTO = employeeService.getEmployeeByEmployeeCode(employeeCode);
        return ResponseEntity.ok(employeeDTO);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllEmployees(){
        List<EmployeeDTO> allEmployees = employeeService.getAllEmployees();
        logger.info("No of all employees: "+allEmployees.size());
        if (allEmployees.size() == 0) return ResponseEntity.ok().body("No employees found");
        return ResponseEntity.ok().body(allEmployees);
    }

    @GetMapping("/getNextCode")
    public ResponseEntity<?> getNextEmployeeCode(){
        String lastEmployeeCode = employeeService.getLastEmployeeCode();
        logger.info("Last EmployeeCode: "+lastEmployeeCode);
        if (lastEmployeeCode==null) return ResponseEntity.ok("E-0001");
        int nextCode = Integer.parseInt(lastEmployeeCode.replace("E-", "")) + 1;
        logger.info("Next EmployeeCode: "+nextCode);
        return ResponseEntity.ok(String.format("E-%04d", nextCode));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            validateEmployee(employeeDTO);
            boolean isExists = employeeService.existsByEmployeeCode(employeeDTO.getEmployeeCode());
            if (!isExists) {
                logger.info("Not Exists Employee.");
                return ResponseEntity.noContent().build();
            }
            employeeService.updateEmployee(employeeDTO);
            logger.info(employeeDTO.getEmployeeCode()+" : Employee updated.");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{employeeCode}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String employeeCode){
        boolean isExists = employeeService.existsByEmployeeCode(employeeCode);
        if (!isExists){
            logger.info("Not Exists Employee.");
            return ResponseEntity.noContent().build();
        }
        employeeService.deleteEmployee(employeeCode);
        return ResponseEntity.ok().build();
    }

    private void validateEmployee(EmployeeDTO employeeDTO) {
        if (!Pattern.compile("^[E]-\\d{4}$").matcher(employeeDTO.getEmployeeCode()).matches()) {
            throw new RuntimeException("Invalid Employee Code.");
        }
        if (!Pattern.compile("^[A-Za-z\\s]{3,}$").matcher(employeeDTO.getEmployeeName()).matches()) {
            throw new RuntimeException("Invalid Employee Name.");
        }
        if (!Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$").matcher(employeeDTO.getEmployeeEmail()).matches()) {
            throw new RuntimeException("Invalid Email.");
        }
        logger.info("Employee validated.");
    }
}