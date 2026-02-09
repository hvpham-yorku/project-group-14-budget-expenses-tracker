package com.yorku.budgettracker.budgettracker.repository;
import com.yorku.budgettracker.budgettracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	List<Expense> findByAcademicTerm(String academicTerm);
	
	@Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> findTotalAmountByCategory();
    
    List<Expense> findByDateBetween(LocalDate start, LocalDate end);
    
    List<Expense> findByCategory(String category);
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.date BETWEEN :start AND :end")
    Double findTotalAmountByDateRange(@Param("start") LocalDate start, @Param("end") LocalDate end);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.academicTerm = :term")
    Double findTotalAmountByTerm(@Param("term") String term);

    List<Expense> findByDescriptionContainingIgnoreCase(String query);

}
