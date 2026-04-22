package com.ws101.senardelacerna.ecommerceapi.exception;

/**
 * Exception thrown when product is not found.
 */
public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String message) {
        super(message);
    }
}