package com.jasper.ecommerce.config;

import com.jasper.ecommerce.entity.Product;
import com.jasper.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] disabledHttpMethods = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // disable PUT, POST, DELETE for Product
        config.getExposureConfiguration().forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disabledHttpMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disabledHttpMethods));

        // disable PUT, POST, DELETE for ProductCategory
        config.getExposureConfiguration().forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disabledHttpMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disabledHttpMethods));
    }
}
