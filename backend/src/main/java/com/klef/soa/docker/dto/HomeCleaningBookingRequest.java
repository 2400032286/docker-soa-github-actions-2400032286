package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class HomeCleaningBookingRequest 
{
    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Booking date is required")
    private String bookingDate;

    @NotNull(message = "Service fee is required")
    @Positive(message = "Service fee must be positive")
    private Double serviceFee;

    @NotNull(message = "Completed status is required")
    private Boolean completed;
}