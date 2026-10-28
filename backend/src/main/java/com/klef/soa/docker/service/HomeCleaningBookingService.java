package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.HomeCleaningBookingRequest;
import com.klef.soa.docker.dto.HomeCleaningBookingResponse;

public interface HomeCleaningBookingService 
{
    HomeCleaningBookingResponse saveHomeCleaningBooking(HomeCleaningBookingRequest request);

    List<HomeCleaningBookingResponse> getAllHomeCleaningBookings();

    HomeCleaningBookingResponse getHomeCleaningBookingById(Long id);

    HomeCleaningBookingResponse updateHomeCleaningBooking(Long id, HomeCleaningBookingRequest request);

    void deleteHomeCleaningBooking(Long id);
}