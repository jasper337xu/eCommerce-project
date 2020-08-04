package com.jasper.ecommerce.dao;

import com.jasper.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

// extend JpaRepository, specify Entity type and Primary Key type
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Spring Data JPA gives many query methods for free, check out JPA documentation
    // @Query annotation can be used to provide your own custom query

    // Spring Data Rest automatically exposes endpoint
    // http://localhost:8080/api/products/search/findByCategoryId?id=2
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // http://localhost:8080/api/products/search/findByNameContaining?name=Big+data
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
