package com.yorku.budgettracker.budgettracker.stub;

import java.util.List;
import com.yorku.budgettracker.budgettracker.model.Expense;

public interface ExpenseStore {
    void add(Expense expense);
    List<Expense> findAll();
    List<Expense> findByAcademicTerm(String academicTerm);
}
