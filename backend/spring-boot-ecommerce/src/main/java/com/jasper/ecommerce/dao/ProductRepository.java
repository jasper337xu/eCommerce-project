package com.jasper.ecommerce.dao;

import com.jasper.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// extend JpaRepository, specify Entity type and Primary Key type
public interface ProductRepository extends JpaRepository<Product, Long> {
}
