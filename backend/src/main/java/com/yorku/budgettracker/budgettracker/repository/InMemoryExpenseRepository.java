package com.yorku.budgettracker.budgettracker.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.yorku.budgettracker.budgettracker.model.Expense;

public class InMemoryExpenseRepository implements ExpenseRepository {

    private List<Expense> expenses = new ArrayList<>();

    public InMemoryExpenseRepository() {

        // fake initial data (stub database)
        expenses.add(new Expense(
                "rent",
                "January rent",
                1200,
                LocalDate.now(),
                "Winter 2026"
        ));
    }

    @Override
    public void add(Expense expense) {
        expenses.add(expense);
    }

    @Override
    public List<Expense> findAll() {
        return expenses;
    }

    @Override
    public List<Expense> findByAcademicTerm(String academicTerm) {

        List<Expense> result = new ArrayList<>();

        for (Expense e : expenses) {
            if (e.getAcademicTerm().equals(academicTerm)) {
                result.add(e);
            }
        }

        return result;
    }
}
