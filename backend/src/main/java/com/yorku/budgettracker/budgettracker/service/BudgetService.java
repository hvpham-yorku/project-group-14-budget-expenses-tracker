package com.yorku.budgettracker.budgettracker.service;

import java.util.List;

import com.yorku.budgettracker.budgettracker.model.Expense;
import com.yorku.budgettracker.budgettracker.repository.ExpenseRepository;

public class BudgetService {

    private final ExpenseRepository expenseRepository;

    public BudgetService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public void addExpense(Expense expense) {
        expenseRepository.add(expense);
    }

    public List<Expense> getExpensesForTerm(String academicTerm) {
        return expenseRepository.findByAcademicTerm(academicTerm);
    }

    public double getTotalExpensesForTerm(String academicTerm) {

        double total = 0;

        for (Expense e : getExpensesForTerm(academicTerm)) {
            total += e.getAmount();
        }

        return total;
    }

    public double getRemainingBalance(String academicTerm, double termIncome) {
        return termIncome - getTotalExpensesForTerm(academicTerm);
    }

    public boolean isOverBudget(String academicTerm, double termIncome) {
        return getRemainingBalance(academicTerm, termIncome) < 0;
    }
}
