package com.yorku.budgettracker.budgettracker.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.yorku.budgettracker.budgettracker.model.Expense;
import com.yorku.budgettracker.budgettracker.repository.InMemoryExpenseRepository;

public class BudgetServiceTest {

    private BudgetService service;

    @BeforeEach
    void setup() {
        service = new BudgetService(new InMemoryExpenseRepository());
    }

    @Test
    void addExpense_increasesCountForTerm() {

        int before = service.getExpensesForTerm("Winter 2026").size();

        service.addExpense(new Expense(
                "food",
                "Lunch",
                20,
                LocalDate.now(),
                "Winter 2026"
        ));

        int after = service.getExpensesForTerm("Winter 2026").size();

        assertEquals(before + 1, after);
    }

    @Test
    void totalExpenses_isCalculatedCorrectly() {

        service.addExpense(new Expense(
                "food",
                "Groceries",
                100,
                LocalDate.now(),
                "Winter 2026"
        ));

        // InMemoryExpenseRepository starts with rent=1200 for Winter 2026
        double total = service.getTotalExpensesForTerm("Winter 2026");

        assertEquals(1300, total, 0.001);
    }

    @Test
    void remainingBalance_isIncomeMinusExpenses() {

        double remaining = service.getRemainingBalance("Winter 2026", 2000);

        // 2000 - 1200 initial rent
        assertEquals(800, remaining, 0.001);
    }

    @Test
    void isOverBudget_trueWhenExpensesExceedIncome() {

        boolean over = service.isOverBudget("Winter 2026", 500);

        // 500 - 1200 initial rent => negative
        assertTrue(over);
    }
}
