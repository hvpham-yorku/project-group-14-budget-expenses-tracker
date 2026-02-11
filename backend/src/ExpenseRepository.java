package com.yorku.budgettracker.budgettracker.repository;

import java.util.List;
import com.yorku.budgettracker.budgettracker.model.Expense;

public interface ExpenseRepository {

    void add(Expense expense);

    List<Expense> findAll();

    List<Expense> findByAcademicTerm(String academicTerm);
}
