package com.klef.soa.docker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.HomeCleaningBookingRequest;
import com.klef.soa.docker.dto.HomeCleaningBookingResponse;
import com.klef.soa.docker.entity.HomeCleaningBooking;
import com.klef.soa.docker.repository.HomeCleaningBookingRepository;


@Service
public class HomeCleaningBookingServiceImpl implements HomeCleaningBookingService
{
    @Autowired
    private HomeCleaningBookingRepository repository;

    @Override
    public HomeCleaningBookingResponse saveHomeCleaningBooking(HomeCleaningBookingRequest request)
    {
        HomeCleaningBooking booking = new HomeCleaningBooking();
        booking.setCustomerName(request.getCustomerName());
        booking.setBookingDate(request.getBookingDate());
        booking.setServiceFee(request.getServiceFee());
        booking.setCompleted(request.getCompleted());

        return mapToResponse(repository.save(booking));
    }

    @Override
    public List<HomeCleaningBookingResponse> getAllHomeCleaningBookings()
    {
        List<HomeCleaningBookingResponse> list = new ArrayList<>();

        for (HomeCleaningBooking booking : repository.findAll())
        {
            list.add(mapToResponse(booking));
        }

        return list;
    }

    @Override
    public HomeCleaningBookingResponse getHomeCleaningBookingById(Long id)
    {
        Optional<HomeCleaningBooking> optional = repository.findById(id);

        if (optional.isPresent())
        {
            return mapToResponse(optional.get());
        }

        return null;
    }

    @Override
    public HomeCleaningBookingResponse updateHomeCleaningBooking(Long id, HomeCleaningBookingRequest request)
    {
        Optional<HomeCleaningBooking> optional = repository.findById(id);

        if (optional.isPresent())
        {
            HomeCleaningBooking booking = optional.get();
            booking.setCustomerName(request.getCustomerName());
            booking.setBookingDate(request.getBookingDate());
            booking.setServiceFee(request.getServiceFee());
            booking.setCompleted(request.getCompleted());

            return mapToResponse(repository.save(booking));
        }

        return null;
    }

    @Override
    public void deleteHomeCleaningBooking(Long id)
    {
        if (repository.existsById(id))
        {
            repository.deleteById(id);
        }
    }

    private HomeCleaningBookingResponse mapToResponse(HomeCleaningBooking booking)
    {
        HomeCleaningBookingResponse response = new HomeCleaningBookingResponse();

        response.setId(booking.getId());
        response.setCustomerName(booking.getCustomerName());
        response.setBookingDate(booking.getBookingDate());
        response.setServiceFee(booking.getServiceFee());
        response.setCompleted(booking.getCompleted());

        return response;
    }
}