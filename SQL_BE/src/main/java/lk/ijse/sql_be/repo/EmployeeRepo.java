package lk.ijse.sql_be.repo;

import lk.ijse.sql_be.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee, String> {
    boolean existsByEmployeeCode(String employeeCode);
    Employee getEmployeeByEmployeeCode(String employeeCode);
    @Query("SELECT MAX (e.employeeCode) FROM Employee e")
    String getLastEmployeeCode();
}