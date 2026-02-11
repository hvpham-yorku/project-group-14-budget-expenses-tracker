package com.yorku.budgettracker.budgettracker.model;

import java.time.LocalDate;

public class Term {

    private String name;        // e.g. Winter 2026
    private LocalDate startDate;
    private LocalDate endDate;
    private double totalIncome;

    public Term() {}

    public Term(String name, LocalDate startDate, LocalDate endDate, double totalIncome) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalIncome = totalIncome;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }
}

