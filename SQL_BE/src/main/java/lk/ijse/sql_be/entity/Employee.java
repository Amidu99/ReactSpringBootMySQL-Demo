package lk.ijse.sql_be.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "employee")
@Entity
public class Employee implements SuperEntity {
    @Id
    private String employeeCode;
    private String employeeName;
    private String employeeEmail;
    private String employeePic;
}