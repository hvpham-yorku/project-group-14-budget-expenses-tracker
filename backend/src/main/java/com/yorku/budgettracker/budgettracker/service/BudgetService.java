package com.yorku.budgettracker.budgettracker.service;

import java.util.List;

import com.yorku.budgettracker.budgettracker.model.Expense;
import com.yorku.budgettracker.budgettracker.stub.ExpenseStore;

public class BudgetService {

    private final ExpenseStore expenseStore;

    public BudgetService(ExpenseStore expenseStore) {
        this.expenseStore = expenseStore;
    }

    public void addExpense(Expense expense) {
        expenseStore.add(expense);
    }

    public List<Expense> getExpensesForTerm(String academicTerm) {
        return expenseStore.findByAcademicTerm(academicTerm);
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
