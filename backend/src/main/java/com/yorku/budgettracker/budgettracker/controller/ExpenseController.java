package com.yorku.budgettracker.budgettracker.controller;

import com.yorku.budgettracker.budgettracker.exception.ExpenseNotFoundException;
import com.yorku.budgettracker.budgettracker.model.Expense;
import com.yorku.budgettracker.budgettracker.repository.ExpenseRepository;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // GET /api/expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return ResponseEntity.ok(expenseRepository.findAll());
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Expense>> getAllExpenses(Pageable pageable) {
        Page<Expense> page = expenseRepository.findAll(pageable);
        return ResponseEntity.ok(page);
    }


    // GET /api/expenses/term/{term}
    @GetMapping("/term/{term}")
    public ResponseEntity<List<Expense>> getExpensesByTerm(@PathVariable String term) {
        return ResponseEntity.ok(expenseRepository.findByAcademicTerm(term));
    }

    // POST /api/expenses
    @PostMapping
    public ResponseEntity<Expense> createExpense(
            @Valid @RequestBody Expense expense) {

        Expense savedExpense = expenseRepository.save(expense);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }

    // PUT /api/expenses/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));

        expense.setCategory(updatedExpense.getCategory());
        expense.setDescription(updatedExpense.getDescription());
        expense.setAmount(updatedExpense.getAmount());
        expense.setDate(updatedExpense.getDate());
        expense.setAcademicTerm(updatedExpense.getAcademicTerm());

        return ResponseEntity.ok(expenseRepository.save(expense));
    }

    // DELETE /api/expenses/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {

        if (!expenseRepository.existsById(id)) {
            throw new ExpenseNotFoundException(id);
        }

        expenseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/summary/category")
    public ResponseEntity<List<CategoryTotal>> getTotalByCategory() {
        List<Object[]> results = expenseRepository.findTotalAmountByCategory();
        List<CategoryTotal> totals = results.stream()
            .map(row -> new CategoryTotal((String)row[0], (Double)row[1]))
            .collect(Collectors.toList());
        return ResponseEntity.ok(totals);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@PathVariable String category) {
        List<Expense> expenses = expenseRepository.findByCategory(category);
        return ResponseEntity.ok(expenses);
    }

    
    @GetMapping("/date-range")
    public ResponseEntity<List<Expense>> getExpensesByDateRange(
        @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
        @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        List<Expense> expenses = expenseRepository.findByDateBetween(start, end);
        return ResponseEntity.ok(expenses);
    }
    
    @GetMapping("/summary/total")
    public ResponseEntity<Double> getTotalExpensesByDateRange(
        @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
        @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        Double total = expenseRepository.findTotalAmountByDateRange(start, end);
        return ResponseEntity.ok(total != null ? total : 0.0);
    }

    @GetMapping("/summary/term/{term}")
    public ResponseEntity<Double> getTotalByTerm(@PathVariable String term) {
        Double total = expenseRepository.findTotalAmountByTerm(term);
        return ResponseEntity.ok(total != null ? total : 0.0);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Expense>> searchExpenses(@RequestParam String query) {
        List<Expense> expenses = expenseRepository.findByDescriptionContainingIgnoreCase(query);
        return ResponseEntity.ok(expenses);
    }

    // DTO for returning summary data
    public static class CategoryTotal {
        private String category;
        private Double totalAmount;

        public CategoryTotal(String category, Double totalAmount) {
            this.category = category;
            this.totalAmount = totalAmount;
        }

        // getters
        public String getCategory() { return category; }
        public Double getTotalAmount() { return totalAmount; }
    }

}
