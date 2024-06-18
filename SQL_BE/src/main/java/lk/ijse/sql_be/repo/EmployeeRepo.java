package lk.ijse.sql_be.repo;

import lk.ijse.sql_be.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, String> {

}