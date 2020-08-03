package com.jasper.ecommerce.config;

import com.jasper.ecommerce.entity.Product;
import com.jasper.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // Autowire JPA Entity Manager
    @Autowired
    private EntityManager entityManager;

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

        this.exposeEntityIds(config);
    }

    private void exposeEntityIds(RepositoryRestConfiguration config) {

        // get a set of all entity types from Entity Manager
        Set<EntityType<?>> entityTypeSet = this.entityManager.getMetamodel().getEntities();

        // convert the set to an array of entity/domain types in order to expose entity ids later
        List<Class> entityClassList = new ArrayList<>();
        for (EntityType tp : entityTypeSet) {
            entityClassList.add(tp.getJavaType());
        }
        Class[] domainTypes = entityClassList.toArray(new Class[0]);

        config.exposeIdsFor(domainTypes);
    }
}
