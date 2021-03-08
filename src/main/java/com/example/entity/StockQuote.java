package com.example.entity;

public class StockQuote {

	private String name;

	private Double price;

	public StockQuote(String name, Double price) {
		this.name = name;
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public Double getPrice() {
		return price;
	}

}
